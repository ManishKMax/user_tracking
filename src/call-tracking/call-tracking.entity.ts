import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CallTracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  project_id: number;

  @Column()
  user_tracking_id: number;

  @Column()
  call_type: string;

  @Column({ nullable: true })
  recording_url: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;
}
