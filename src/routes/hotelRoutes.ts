import { Router } from 'express';
import { HotelController } from '../controllers/HotelController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/hotels', authMiddleware, HotelController.getHotels);

export default router;