// JSON Encryption/Decryption Tool
function encryptJson(data) {
    try {
        const jsonData = JSON.stringify(data);
        const aesKey = CryptoJS.lib.WordArray.random(16);
        const aesIv = CryptoJS.lib.WordArray.random(16);

        const encryptedPayload = CryptoJS.AES.encrypt(jsonData, aesKey, {
            iv: aesIv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();

        const rsa = new JSEncrypt();
        rsa.setPublicKey(CONFIG.PUBLIC_KEY);

        const encryptedKey = rsa.encrypt(aesKey.toString(CryptoJS.enc.Base64));
        const encryptedIv = rsa.encrypt(aesIv.toString(CryptoJS.enc.Base64));

        if (!encryptedKey || !encryptedIv) {
            throw new Error('RSA encryption failed.');
        }

        return {
            alphaXyz: encryptedKey,
            sigmaBlt: encryptedIv,
            kappaRmn: encryptedPayload,
            secretKey: aesKey.toString(CryptoJS.enc.Base64),
            iv: aesIv.toString(CryptoJS.enc.Base64)
        };
    } catch (error) {
        throw new Error('Encryption process encountered an error: ' + error.message);
    }
}

function decryptJsonWithRSA(encryptedData) {
    try {
        const { alphaXyz, sigmaBlt, kappaRmn } = encryptedData;

        const rsa = new JSEncrypt();
        rsa.setPrivateKey(CONFIG.PRIVATE_KEY);

        const decryptedKeyBase64 = rsa.decrypt(alphaXyz);
        const decryptedIvBase64 = rsa.decrypt(sigmaBlt);

        if (!decryptedKeyBase64 || !decryptedIvBase64) {
            throw new Error("RSA decryption failed. Please check the encrypted key/IV or private key.");
        }

        const decrypted = CryptoJS.AES.decrypt(kappaRmn, 
            CryptoJS.enc.Base64.parse(decryptedKeyBase64), {
                iv: CryptoJS.enc.Base64.parse(decryptedIvBase64),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedText);
    } catch (err) {
        throw new Error("Decryption failed: " + err.message);
    }
}

function encryptData() {
    const jsonInput = document.getElementById('jsonInput');
    const resultDiv = document.getElementById('encryptionResult');
    const errorDiv = document.getElementById('encryptError');
    const keysDiv = document.getElementById('keys');
    const secretKeySpan = document.getElementById('secretKey');
    const ivSpan = document.getElementById('ivValue');

    // Hide previous results
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    keysDiv.style.display = 'none';

    try {
        const data = JSON.parse(jsonInput.value);
        const encrypted = encryptJson(data);
        
        // Display encrypted data
        const displayData = {
            alphaXyz: encrypted.alphaXyz,
            sigmaBlt: encrypted.sigmaBlt,
            kappaRmn: encrypted.kappaRmn
        };
        resultDiv.textContent = JSON.stringify(displayData, null, 2);
        resultDiv.style.display = 'block';

        // Display keys
        secretKeySpan.textContent = encrypted.secretKey;
        ivSpan.textContent = encrypted.iv;
        keysDiv.style.display = 'block';
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    }
}

function decryptData() {
    const encryptedInput = document.getElementById('encryptedInput');
    const resultDiv = document.getElementById('decryptionResult');
    const errorDiv = document.getElementById('decryptError');

    // Hide previous results
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    try {
        const encryptedData = JSON.parse(encryptedInput.value);
        const decrypted = decryptJsonWithRSA(encryptedData);

        resultDiv.textContent = JSON.stringify(decrypted, null, 2);
        resultDiv.style.display = 'block';
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    }
}