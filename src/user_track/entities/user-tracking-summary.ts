import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('user_tracking_summary')
export class UserTrackingSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  project_id: string;

  @Column()
  user_agent: string;

  @Column({ type: 'timestamp', nullable: true })
  checkin: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkout: Date;

  @Column({ type: 'json', nullable: true })
  checkin_checkout_time: { checkin: string; checkout: string | null }[];

  @Column({ type: 'json', nullable: true })
  break_resume_time: { start: string; end: string | null }[];

  @Column({ default: 0 })
  totalbreak: number;

  @Column({ default: 0 })
  total_hours_worked: number;

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn({ type: 'timestamp' }) // Automatically sets the current timestamp
  created: Date;
}
