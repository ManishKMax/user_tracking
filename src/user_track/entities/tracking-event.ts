import { EventType } from 'src/user_track/event-type.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracking_event')
export class TrackingEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({
    type: 'enum',
    enum: EventType, // Use the EventType enum here
  })
  event_type: EventType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column()
  user_agent: string;

  @Column()
  project_id: string;
}
