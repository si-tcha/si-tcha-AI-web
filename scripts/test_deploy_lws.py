import hashlib
import importlib.util
from pathlib import Path
import ssl
import unittest
from unittest.mock import Mock, patch

spec = importlib.util.spec_from_file_location('deploy_lws', Path(__file__).with_name('deploy-lws.py'))
deploy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deploy)


class VerifiedFTPTests(unittest.TestCase):
    certificate = b'unit-test-certificate'

    def pinned_client(self):
        return deploy.VerifiedFTP_TLS(fingerprint=hashlib.sha256(self.certificate).hexdigest())

    def test_default_checks_chain_and_hostname(self):
        client = deploy.VerifiedFTP_TLS()
        self.assertTrue(client.context.check_hostname)
        self.assertEqual(client.context.verify_mode, ssl.CERT_REQUIRED)

    def test_pin_keeps_certificate_authority_validation(self):
        client = self.pinned_client()
        self.assertFalse(client.context.check_hostname)
        self.assertEqual(client.context.verify_mode, ssl.CERT_REQUIRED)

    def test_invalid_pin_is_rejected(self):
        for value in ['bad', '00' * 31, 'zz' * 32]:
            with self.assertRaises(ValueError):
                deploy.VerifiedFTP_TLS(fingerprint=value)

    def test_formatted_fingerprint_is_accepted(self):
        digest = hashlib.sha256(self.certificate).hexdigest().upper()
        formatted = ':'.join(digest[i:i+2] for i in range(0, 64, 2))
        client = deploy.VerifiedFTP_TLS(fingerprint=formatted + '\n')
        connection = Mock()
        connection.getpeercert.return_value = self.certificate
        client.verify_pin(connection)
        connection.close.assert_not_called()

    def test_mismatch_aborts_before_sending_credentials(self):
        client = self.pinned_client()
        client.sock = Mock()
        client.sock.getpeercert.return_value = b'wrong-certificate'
        with patch('ftplib.FTP_TLS.auth', return_value='234 TLS ready'), patch('ftplib.FTP.login') as send_credentials:
            with self.assertRaises(deploy.FingerprintMismatch):
                client.login('user', 'password')
            send_credentials.assert_not_called()
        client.sock.close.assert_called_once()

    def test_data_channel_is_also_pinned(self):
        client = self.pinned_client()
        client._prot_p = True
        connection = Mock()
        connection.getpeercert.return_value = b'wrong-data-certificate'
        with patch('ftplib.FTP_TLS.ntransfercmd', return_value=(connection, None)):
            with self.assertRaises(deploy.FingerprintMismatch):
                client.ntransfercmd('STOR test.txt')
        connection.close.assert_called_once()

    def test_unencrypted_data_channel_is_rejected(self):
        client = self.pinned_client()
        connection = Mock()
        with patch('ftplib.FTP_TLS.ntransfercmd', return_value=(connection, None)):
            with self.assertRaises(ssl.SSLError):
                client.ntransfercmd('STOR test.txt')


if __name__ == '__main__':
    unittest.main()
