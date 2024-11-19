import { DataSource } from 'typeorm';

import {
  DB_HOST,
  DB_PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  NODE_ENV,
} from './constants';

const SYNC = false;
const isProduction = NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: parseInt(DB_PORT || '5434'),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [__dirname + '/entity/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  synchronize: SYNC,
  logging: SYNC,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
