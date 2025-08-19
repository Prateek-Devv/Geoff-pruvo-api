import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  hotel_id!: string;

  @Column()
  hotel_name!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  country_code!: string;

  @Column()
  lat_long!: string;
}