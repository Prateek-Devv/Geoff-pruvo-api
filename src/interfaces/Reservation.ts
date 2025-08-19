export interface ReservationPayload {
  status?: string;
  custom_reference?: string;
  supplier_remarks?: string;
  user_remarks?: string;
  net_price: number;
  currency_code: string;
  room_type: string;
  meal_plan?: string;
  num_rooms?: number;
  guests: Array<{ name: string; age: number; gender?: string; nationality: string }>;
  reservation_date?: string;
  arrival_date: string;
  departure_date: string;
  last_free_cancel_time: string;
  hotel_code: string;
  original_docket?: string;
}

export interface ReservationResponse extends ReservationPayload {
  reservation_id: string;
  id: string;
}