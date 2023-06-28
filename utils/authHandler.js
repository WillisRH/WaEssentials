const qrcode = require('qrcode-terminal');

function handleAuthentication() {
  console.log('Authentication successful');
}

function handleQRCode(qr) {
  console.log('Scan the QR code to log in:');
  qrcode.generate(qr, { small: true });
}

module.exports = {
  handleAuthentication,
  handleQRCode,
};
