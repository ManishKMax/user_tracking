import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Trip } from '../trip/trip.entity';


@Entity('trip_location')
export class TripLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tripid: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ default: '0' })
  distance: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @ManyToOne(() => Trip, trip => trip.locations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tripid' })
  trip: Trip;
}
