const crypto = require('crypto');

const ALGORITHM = process.env.ENCRYPTION_ALGORITHM;
const secretKey = process.env.SECRET_KEY;
const iv = crypto.randomBytes(16);

const encryptNote = (text) => {

    const cipherTxt = crypto.createCipheriv(ALGORITHM, secretKey, iv);

    const encryptedTxt = Buffer.concat([cipherTxt.update(text), cipherTxt.final()]);

    return encryptedTxt.toString('hex');
};

const decryptNote = (hash) => {

    const decipherTxt = crypto.createDecipheriv(ALGORITHM, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpytedTxt = Buffer.concat([decipherTxt.update(Buffer.from(hash.content, 'hex')), decipherTxt.final()]);

    return decrpytedTxt.toString();
};

module.exports = {
    encryptNote,
    decryptNote,
    iv: iv.toString('hex')
};