import crypto, { Cipher } from 'crypto';
import {
  CONFIRMATION_SECRET_KEY,
  CRYPTO_ALGORITHM,
  INTIALIZATION_VECTOR,
} from '../constants';

const algorithm = CRYPTO_ALGORITHM;
const secretKey = CONFIRMATION_SECRET_KEY;
const iv = INTIALIZATION_VECTOR;

export const encrypt = (token: string) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, 'hex')
  );

  const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);
  return encrypted.toString('hex');
};

export const decrypt = (hash: string) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, 'hex')
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString();
};
