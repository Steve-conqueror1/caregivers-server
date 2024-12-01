import dotenv from 'dotenv';
dotenv.config();

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const DB_SSL = process.env.DB_SSL;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 5001;
export const ACCESS_SECRET = process.env.ACCESS_SECRET;

export const REFRESH_SECRET = process.env.REFRESH_SECRET;

export const CRYPTO_ALGORITHM = process.env.CRYPTO_ALGORITHM as string;
export const CONFIRMATION_SECRET_KEY = process.env
  .CONFIRMATION_SECRET_KEY as string;
export const INTIALIZATION_VECTOR = process.env.INTIALIZATION_VECTOR as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const INFORMER_API = process.env.INFORMER_API as string;
