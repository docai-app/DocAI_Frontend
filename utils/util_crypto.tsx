'use client';
import crypto from 'crypto';
import _ from 'lodash';

const PARAMS_SECRET_KEY = process.env.NEXT_PUBLIC_PARAMS_SECRET_KEY;

// Encryption
export function encrypt(text: string) {
    if (_.isEmpty(text)) return;
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(PARAMS_SECRET_KEY || ''); // using your secret key
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decryption
export function decrypt(text: string) {
    if (_.isEmpty(text)) return;
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift() || '', 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(PARAMS_SECRET_KEY || ''),
        iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
