import { Router } from 'express';
import { ReservationController } from '../controllers/ReservationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/bookings_query', authMiddleware, ReservationController.queryReservations);
router.get('/booking', authMiddleware, ReservationController.getReservation);
router.post('/book', authMiddleware, ReservationController.createBooking);
router.post('/cancel', authMiddleware, ReservationController.cancelReservation);
router.post('/reprice', authMiddleware, ReservationController.repriceReservation);

export default router;