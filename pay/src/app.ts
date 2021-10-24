//import 'reflect-metadata';
//import 'dotenv/config';
import AppError from './errors/AppError';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
//import 'express-async-errors';

import routes from './routes';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response.status(500).json({ status: 'error', message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
