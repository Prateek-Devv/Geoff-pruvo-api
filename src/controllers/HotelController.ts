import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Hotel } from '../entities/Hotel';

export class HotelController {
  static async getHotels(req: Request, res: Response) {
    try {
      const hotelRepository = AppDataSource.getRepository(Hotel);
      const hotels = await hotelRepository.find();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve hotels' });
    }
  }
}