import express, { Application } from 'express';
import bodyParser from 'body-parser';
import hotelRoutes from './routes/hotelRoutes';
import reservationRoutes from './routes/reservationRoutes';

export const createApp = (): Application => {
  const app = express();
  app.use(bodyParser.json());
  app.use(hotelRoutes);
  app.use(reservationRoutes);
  return app;
};