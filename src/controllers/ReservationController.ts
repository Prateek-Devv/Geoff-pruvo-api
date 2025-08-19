import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Reservation } from '../entities/Reservation';
import { ReservationPayload, ReservationResponse } from '../interfaces/Reservation';
import { v4 as uuidv4 } from 'uuid';

export class ReservationController {
  static async queryReservations(req: Request, res: Response) {
    const { from, to } = req.query;
    if (!from || !to) {
      return res.status(400).json({ error: 'Missing from or to query parameters' });
    }

    try {
      const reservationRepository = AppDataSource.getRepository(Reservation);
      const reservations = await reservationRepository
        .createQueryBuilder('reservation')
        .where('reservation.reservation_date BETWEEN :from AND :to', { from, to })
        .getMany();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to query reservations' });
    }
  }

  static async getReservation(req: Request, res: Response) {
    const { docket, custom_reference } = req.query;
    if (!docket && !custom_reference) {
      return res.status(400).json({ error: 'Missing docket or custom_reference query parameter' });
    }

    try {
      const reservationRepository = AppDataSource.getRepository(Reservation);
      let reservation: Reservation | null;
      if (docket) {
        reservation = await reservationRepository.findOneBy({ reservation_id: docket as string });
      } else {
        reservation = await reservationRepository.findOneBy({
          custom_reference: custom_reference as string,
        });
      }

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve reservation' });
    }
  }

  static async createBooking(req: Request, res: Response) {
    const body: ReservationPayload = req.body;
    if (
      !body.net_price ||
      !body.currency_code ||
      !body.room_type ||
      !body.arrival_date ||
      !body.departure_date ||
      !body.hotel_code
    ) {
      return res.status(400).json({ error: 'Missing required fields for booking' });
    }

    try {
      const reservationRepository = AppDataSource.getRepository(Reservation);
      const newReservation = reservationRepository.create({
        reservation_id: uuidv4(),
        status: body.status || 'confirmed',
        custom_reference: body.custom_reference,
        supplier_remarks: body.supplier_remarks,
        user_remarks: body.user_remarks,
        net_price: body.net_price,
        currency_code: body.currency_code,
        room_type: body.room_type,
        meal_plan: body.meal_plan,
        num_rooms: body.num_rooms || 1,
        guests: body.guests,
        reservation_date: body.reservation_date || new Date().toISOString().split('T')[0],
        arrival_date: body.arrival_date,
        departure_date: body.departure_date,
        last_free_cancel_time: body.last_free_cancel_time,
        hotel_code: body.hotel_code,
      });

      const savedReservation = await reservationRepository.save(newReservation);
      res.status(201).json(savedReservation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create booking' });
    }
  }

  static async cancelReservation(req: Request, res: Response) {
    const { docket } = req.body;
    if (!docket) {
      return res.status(400).json({ error: 'Missing docket in request body' });
    }

    try {
      const reservationRepository = AppDataSource.getRepository(Reservation);
      const reservation = await reservationRepository.findOneBy({ reservation_id: docket });

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      if (new Date() > new Date(reservation.last_free_cancel_time)) {
        return res.status(403).json({ error: 'Cancellation period has expired' });
      }

      reservation.status = 'canceled';
      await reservationRepository.save(reservation);
      res.json({ message: 'Reservation canceled', refund_status: 'initiated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to cancel reservation' });
    }
  }

  static async repriceReservation(req: Request, res: Response) {
    const { originalDocket, newDocket } = req.body;
    if (!originalDocket || !newDocket) {
      return res.status(400).json({ error: 'Missing originalDocket or newDocket' });
    }

    try {
      const reservationRepository = AppDataSource.getRepository(Reservation);
      const originalReservation = await reservationRepository.findOneBy({
        reservation_id: originalDocket,
      });
      const newReservation = await reservationRepository.findOneBy({ reservation_id: newDocket });

      if (!originalReservation || !newReservation) {
        return res.status(404).json({ error: 'One or both reservations not found' });
      }

      originalReservation.status = 'repriced';
      originalReservation.custom_reference = `Repriced to ${newDocket}`;
      await reservationRepository.save(originalReservation);
      res.json({ message: 'Back office updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update back office' });
    }
  }
}