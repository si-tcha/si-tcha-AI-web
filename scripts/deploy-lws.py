"""Upload the compiled site over explicit FTPS. Never delete remote files."""
import ftplib
import os
from pathlib import Path
import posixpath
import ssl
import sys


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
    context = ssl.create_default_context()
    with ftplib.FTP_TLS(context=context, timeout=60) as ftp:
        ftp.connect(values['LWS_FTP_HOST'], 21)
        # Certificate chain AND hostname must validate before sending the password.
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
    except ssl.SSLCertVerificationError:
        sys.exit('TLS certificate verification failed. Configure a validated LWS FTP hostname; certificate checks remain enabled.')
    except Exception as error:
        # Do not print credentials or raw server responses into public logs.
        sys.exit(f'Deployment stopped ({type(error).__name__}). Check connection, destination and GitHub secrets.')
