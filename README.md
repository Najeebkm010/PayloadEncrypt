# JSON Encryption/Decryption Tool

A simple web-based tool for encrypting and decrypting JSON data using RSA and AES encryption.

## Features

- **Hybrid Encryption**: Uses RSA for key exchange and AES for data encryption
- **Secure**: RSA-2048 encryption with AES-128 CBC mode
- **User-friendly**: Clean interface for easy encryption/decryption
- **Modular**: Separated into HTML, CSS, JS, and configuration files

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # Main functionality
├── config.js           # RSA keys configuration
├── .env.example        # Environment variables example
└── README.md           # Documentation
```

## How It Works

1. **Encryption Process**:
   - Input JSON is encrypted using AES-128-CBC
   - AES key and IV are encrypted using RSA public key
   - Returns encrypted payload with keys

2. **Decryption Process**:
   - RSA private key decrypts the AES key and IV
   - AES key is used to decrypt the actual JSON data

## Usage

1. **Setup**:
   - Copy `.env.example` to `.env` (optional, for server environments)
   - Replace RSA keys in `config.js` with your own keys if needed

2. **Encryption**:
   - Paste your JSON data in the encryption textarea
   - Click "Encrypt" button
   - Copy the encrypted result and save the displayed keys

3. **Decryption**:
   - Paste the full encrypted JSON (with alphaXyz, sigmaBlt, kappaRmn fields)
   - Click "Decrypt" button
   - Get your original JSON data back

## Security Notes

- Keep your private key secure and never expose it in production
- The current keys are for demonstration purposes only
- For production use, generate your own RSA key pair
- Consider using environment variables for key management in server environments

## Dependencies

- [CryptoJS](https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js) - For AES encryption
- [JSEncrypt](https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.3.2/jsencrypt.min.js) - For RSA encryption

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- Web Crypto APIs (through CryptoJS)
- Base64 encoding/decoding