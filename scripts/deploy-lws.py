"""Upload the compiled site over explicit FTPS. Never delete remote files."""
import ftplib
import hashlib
import hmac
import os
from pathlib import Path
import posixpath
import re
import ssl
import sys


class FingerprintMismatch(ssl.SSLCertVerificationError):
    pass


class VerifiedFTP_TLS(ftplib.FTP_TLS):
    """Use normal TLS validation, or CA validation plus an explicit certificate pin."""

    def __init__(self, fingerprint='', **kwargs):
        fingerprint = re.sub(r'[\s:]', '', fingerprint).lower()
        if fingerprint and not re.fullmatch(r'[0-9a-f]{64}', fingerprint):
            raise ValueError('LWS_FTP_CERT_SHA256 must contain a 64-character SHA-256 fingerprint.')
        self.fingerprint = fingerprint
        context = ssl.create_default_context()
        if fingerprint:
            # Replace hostname matching with an exact, explicitly trusted pin.
            # Certificate chain and expiry validation remain required.
            context.check_hostname = False
        super().__init__(context=context, **kwargs)

    def verify_pin(self, connection):
        if not self.fingerprint:
            return
        certificate = connection.getpeercert(binary_form=True)
        digest = hashlib.sha256(certificate).hexdigest() if certificate else ''
        if not hmac.compare_digest(digest, self.fingerprint):
            connection.close()
            raise FingerprintMismatch('The server certificate does not match the trusted SHA-256 fingerprint.')

    def auth(self):
        response = super().auth()
        # FTP_TLS.login calls auth BEFORE sending the username or password.
        self.verify_pin(self.sock)
        return response

    def ntransfercmd(self, cmd, rest=None):
        connection, size = super().ntransfercmd(cmd, rest)
        if not self._prot_p:
            connection.close()
            raise ssl.SSLError('An encrypted FTP data connection is required.')
        self.verify_pin(connection)
        return connection, size


def main():
    names = ('LWS_FTP_HOST', 'LWS_FTP_USER', 'LWS_FTP_PASSWORD', 'LWS_FTP_DIR')
    values = {name: os.environ.get(name, '') for name in names}
    if not all(values.values()):
        raise ValueError('Configure all four LWS_FTP_* secrets before deployment.')
    if any('\r' in value or '\n' in value for value in values.values()):
        raise ValueError('Invalid newline in FTP configuration.')
    target = posixpath.normpath(values['LWS_FTP_DIR'])
    if not target.startswith('/') or posixpath.basename(target) != 'si-tcha.com':
        raise ValueError('Destination must be the absolute FTP path to si-tcha.com, never the hosting root.')
    source = Path('dist')
    if not (source / 'index.html').is_file() or not (source / 'sitemap.xml').is_file():
        raise ValueError('Build the site before deployment.')
    with VerifiedFTP_TLS(fingerprint=os.environ.get('LWS_FTP_CERT_SHA256', ''), timeout=60) as ftp:
        ftp.connect(values['LWS_FTP_HOST'], 21)
        # Validate chain and hostname (or the explicitly configured pin) first.
        ftp.login(values['LWS_FTP_USER'], values['LWS_FTP_PASSWORD'])
        ftp.prot_p()
        ftp.set_pasv(True)
        # Destination must already exist: do not guess or create its parent path.
        ftp.cwd(target)
        destination = ftp.pwd()
        if posixpath.basename(posixpath.normpath(destination)) != 'si-tcha.com':
            raise ValueError('The FTP server did not confirm the Si-Tcha AI directory.')
        files = [file for file in source.rglob('*') if file.is_file()
                 and '.vite' not in file.relative_to(source).parts]
        # Publish assets before the HTML documents that reference them.
        files.sort(key=lambda file: (file.suffix == '.html', file.as_posix()))
        created = {'.'}
        for file in files:
            relative = file.relative_to(source).as_posix()
            directory = posixpath.dirname(relative)
            parts = directory.split('/') if directory else []
            current = ''
            for part in parts:
                current = posixpath.join(current, part)
                if current in created:
                    continue
                ftp.cwd(destination)
                try:
                    ftp.cwd(current)
                except ftplib.error_perm:
                    ftp.cwd(destination)
                    ftp.mkd(current)
                created.add(current)
            ftp.cwd(destination)
            with file.open('rb') as stream:
                ftp.storbinary('STOR ' + relative, stream)
        print(f'Uploaded {len(files)} files to the Si-Tcha AI directory. No remote files deleted.')


if __name__ == '__main__':
    try:
        main()
    except FingerprintMismatch:
        sys.exit('TLS fingerprint mismatch. Deployment stopped; verify the server certificate before changing LWS_FTP_CERT_SHA256.')
    except ssl.SSLCertVerificationError:
        sys.exit('TLS verification failed. Use a validated LWS FTP hostname or configure a verified LWS_FTP_CERT_SHA256 for a hostname mismatch. Certificate chain and expiry checks remain enabled.')
    except Exception as error:
        # Do not print credentials or raw server responses into public logs.
        sys.exit(f'Deployment stopped ({type(error).__name__}). Check connection, destination and GitHub secrets.')
