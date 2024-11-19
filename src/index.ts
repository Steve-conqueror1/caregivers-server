import 'reflect-metadata';
import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import { AppDataSource } from './appDataSource';
import {
  DB_PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  PORT,
} from './constants';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

// export const DB_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${DB_PORT}/${POSTGRES_DB}?schema=public`;

AppDataSource.initialize()
  .then(() => {
    console.log(`Datasource initilized`);
    app.listen(PORT as string, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error during Data source initialization', err);
  });
