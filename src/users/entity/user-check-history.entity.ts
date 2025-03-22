import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserTracking } from './user-tracking.entity';

@Entity('user_check_history')
export class UserCheckHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  checkin_time: Date;

  @Column('timestamp', { nullable: true })
  checkout_time: Date;

  @Column('timestamp', { nullable: true })
  break_start: Date;

  @Column('timestamp', { nullable: true })
  resume_at: Date;

  @Column('varchar', { nullable: true })
  break_time: string;

  @Column('varchar', { nullable: true })
  break_resume_time: string;

  @Column('varchar', { nullable: true })
  user_agent: string;

  @ManyToOne(() => UserTracking, (userTracking) => userTracking.userCheckHistories)
  @JoinColumn({ name: 'user_tracking_id' })  // Foreign key to UserTracking
  userTracking: UserTracking;

  @Column('bigint')
  user_tracking_id: number;  // Foreign key for UserTracking
}
