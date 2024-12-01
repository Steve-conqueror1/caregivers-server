import 'reflect-metadata';
import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './data-source';
import { PORT } from './constants';

import authRouter from './routes/auth';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// Logger
app.use(morgan('dev'));

app.use('/api/v1', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

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
