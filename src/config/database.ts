import { DataSource } from 'typeorm';
import { Hotel } from '../entities/Hotel';
import { Reservation } from '../entities/Reservation';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pruvo_api_db',
  synchronize: true,
  logging: false,
  entities: [Hotel, Reservation],
});
