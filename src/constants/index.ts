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
