import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TripLocation } from '../trip-location/trip-location.entity';


@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  project_id: string;

  @Column()
  user_agent: string;

  @Column({ type: 'datetime', nullable: true })
  startDateTime: Date;

  @Column({ type: 'datetime', nullable: true })
  endDateTime: Date;

  @Column({ nullable: true })
  startlocation: string;

  @Column({ nullable: true })
  endlocation: string;

  @Column({ default: '0' })
  total_distance: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @OneToMany(() => TripLocation, location => location.trip, { cascade: true })
  locations: TripLocation[];
}
