const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
${process.env.PUBLIC_KEY}
-----END PUBLIC KEY-----`;

const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
${process.env.PRIVATE_KEY}
-----END PRIVATE KEY-----`;

function newEncryptJson(data) {
  const jsonData = JSON.stringify(data);
  const aesKey = CryptoJS.lib.WordArray.random(16);
  const aesIv = CryptoJS.lib.WordArray.random(16);

  const encryptedPayload = CryptoJS.AES.encrypt(jsonData, aesKey, {
    iv: aesIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  const rsa = new JSEncrypt();
  rsa.setPublicKey(PUBLIC_KEY);

  const encryptedKey = rsa.encrypt(aesKey.toString(CryptoJS.enc.Base64));
  const encryptedIv = rsa.encrypt(aesIv.toString(CryptoJS.enc.Base64));

  if (!encryptedKey || !encryptedIv) throw new Error("RSA encryption failed.");

  return {
    alphaXyz: encryptedKey,
    sigmaBlt: encryptedIv,
    kappaRmn: encryptedPayload,
    secretKey: aesKey.toString(CryptoJS.enc.Base64),
    iv: aesIv.toString(CryptoJS.enc.Base64)
  };
}

function encryptData() {
  try {
    const jsonInput = document.getElementById("jsonInput").value;
    const resultDiv = document.getElementById("encryptionResult");
    const errorDiv = document.getElementById("encryptError");
    const keysDiv = document.getElementById("keys");

    const { alphaXyz, sigmaBlt, kappaRmn, secretKey, iv } = newEncryptJson(JSON.parse(jsonInput));

    resultDiv.textContent = JSON.stringify({ alphaXyz, sigmaBlt, kappaRmn }, null, 2);
    document.getElementById("secretKey").textContent = secretKey;
    document.getElementById("ivValue").textContent = iv;

    resultDiv.style.display = keysDiv.style.display = "block";
    errorDiv.style.display = "none";
  } catch (err) {
    document.getElementById("encryptError").textContent = err.message;
    document.getElementById("encryptError").style.display = "block";
  }
}

function decryptData() {
  try {
    const encryptedData = JSON.parse(document.getElementById("encryptedInput").value);
    const { alphaXyz, sigmaBlt, kappaRmn } = encryptedData;

    const rsa = new JSEncrypt();
    rsa.setPrivateKey(PRIVATE_KEY);

    const key = rsa.decrypt(alphaXyz);
    const iv = rsa.decrypt(sigmaBlt);

    const decrypted = CryptoJS.AES.decrypt(kappaRmn, CryptoJS.enc.Base64.parse(key), {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    document.getElementById("decryptionResult").textContent = JSON.stringify(JSON.parse(result), null, 2);
    document.getElementById("decryptionResult").style.display = "block";
    document.getElementById("decryptError").style.display = "none";
  } catch (err) {
    document.getElementById("decryptError").textContent = err.message;
    document.getElementById("decryptError").style.display = "block";
  }
}
