# Pruvo API
An Express-TypeScript-TypeORM API for integrating with Pruvo's Repricing API.

## Setup
1. Install dependencies: `npm install`
2. Configure PostgreSQL in `src/config/database.ts`.
3. Run migrations (in production) or enable `synchronize: true` for development.
4. Start the server: `npm run dev`
5. Build for production: `npm run build && npm start`

## Endpoints
- GET `/bookings_query?from=YYYY-MM-DD&to=YYYY-MM-DD`: Query reservations by creation date.
- GET `/booking?docket=<docket>`: Get reservation by docket.
- GET `/booking?custom_reference=<custom_reference>`: Get reservation by custom reference.
- POST `/book`: Create a new booking.
- POST `/cancel`: Cancel a reservation.
- GET `/hotels`: Retrieve static hotel information.
- POST `/reprice`: Update back office with repriced reservation.

## Notes
- Replace `your_pruvo_api_key` in `authMiddleware.ts` with Pruvo's API key.
- Integrate payment gateway for `/book` and `/cancel` endpoints in production.