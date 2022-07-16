import 'dotenv/config';

import 'express-async-errors';
import 'reflect-metadata';
import './container';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import cron from 'node-cron';
import { QueryFailedError } from 'typeorm';

import AppError from '@errors/AppError';
import { executeDailyJobs } from '@jobs/cronDailySchedule';

import connection from './database';
import routes from './routes';

const APP_PORT = process.env.APP_PORT || 3105;
const { CRON_DAILY_HOUR, CRON_DAILY_MINUTE } = process.env;

connection();

const app = express();
app.disable('x-powered-by');
app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(routes);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error(err);

  if (err instanceof AppError) {
    console.error(err);
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  if (err instanceof QueryFailedError) {
    return response.status(500).json({
      status: 'Query failed error',
      message: `Unexpected error: ${err.message}`,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

cron.schedule(
  `${CRON_DAILY_MINUTE} ${CRON_DAILY_HOUR} * * *`,
  executeDailyJobs
);

app.listen(APP_PORT, () => {
  console.log(`▶️ Server started on port ${APP_PORT} !`);
});
