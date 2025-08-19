import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  reservation_id!: string;

  @Column({ nullable: true })
  custom_reference?: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  supplier_remarks?: string;

  @Column({ nullable: true })
  user_remarks?: string;

  @Column('decimal')
  net_price!: number;

  @Column()
  currency_code!: string;

  @Column()
  room_type!: string;

  @Column({ nullable: true })
  meal_plan?: string;

  @Column('int')
  num_rooms!: number;

  @Column('jsonb')
  guests!: Array<{ name: string; age: number; gender?: string; nationality: string }>;

  @Column()
  reservation_date!: string;

  @Column()
  arrival_date!: string;

  @Column()
  departure_date!: string;

  @Column()
  last_free_cancel_time!: string;

  @Column()
  hotel_code!: string;
}