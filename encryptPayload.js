// const CryptoJS = require('crypto-js');
// const JSEncrypt = require('node-jsencrypt');

// const publicKey = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFk94rdfXR9NBkNh44v3
// Jke5lYmd9Tdb3jsQduMhHFlTi2+qLjBnaiOzYQbDHnN8MKnDSI/HOewBfX0UOAhw
// S5rYO/MfpFnehylkCW0fttD7rP/CM1ZD7sQt+Xs8KgDj/7uLMy1Bw1KhEHRdND44
// mBf9LIubtbv8NY4LBPyJUrTbcXpNqFDicVMN81Mq1hPrq0udqoBInaEkI+beCVWN
// dHKHqeybmlkvs23+zGktp+hN0hlmxug78co5yJB4MT9ErvJAqOy0Pz93hNYoI7Nj
// hwPf9za0m5VhF3kytwwNF8xue3gDH0wDXxhlEu+wGakto6Z+TJ6siELI1atiqTuH
// gwIDAQAB
// -----END PUBLIC KEY-----`;

// function newEncryptJson(data) {
//     try {
//         // Convert input data to JSON string
//         const jsonData = JSON.stringify(data);
        
//         // Generate random AES key and IV using CryptoJS
//         const aesKey = CryptoJS.lib.WordArray.random(16);
//         const aesIv = CryptoJS.lib.WordArray.random(16);

//         // Encrypt data using AES
//         const encryptedPayload = CryptoJS.AES.encrypt(jsonData, aesKey, {
//             iv: aesIv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         }).toString();

//         // Initialize RSA encryption
//         const rsa = new JSEncrypt();
//         rsa.setPublicKey(publicKey);

//         // Encrypt AES key and IV with RSA
//         const encryptedKey = rsa.encrypt(aesKey.toString(CryptoJS.enc.Base64));
//         const encryptedIv = rsa.encrypt(aesIv.toString(CryptoJS.enc.Base64));

//         if (!encryptedKey || !encryptedIv) {
//             throw new Error('RSA encryption failed.');
//         }

//         // Return the encrypted data in the required format
//         return {
//             alphaXyz: encryptedKey,
//             sigmaBlt: encryptedIv,
//             kappaRmn: encryptedPayload
//         };
//     } catch (error) {
//         throw new Error('Encryption process encountered an error: ' + error.message);
//     }
// }

// // Example usage
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// readline.question('Enter JSON data to encrypt: ', (input) => {
//     try {
//         const data = JSON.parse(input);
//         const encrypted = newEncryptJson(data);
//         console.log(JSON.stringify(encrypted));
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
//     readline.close();
// });