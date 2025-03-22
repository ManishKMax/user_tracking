import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserCheckHistory } from './user-check-history.entity';

@Entity('user_tracking')
export class UserTracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  checkin_time: string;

  @Column('timestamp', { nullable: true })
  checkout_time: string;

  @Column('varchar')
  user_agent: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column('varchar', { nullable: true })
  break_time: string;

  @Column('varchar', { nullable: true })
  break_resume_time: string;

  // This will store all associated UserCheckHistory entries
  @OneToMany(() => UserCheckHistory, (userCheckHistory) => userCheckHistory.userTracking)
  userCheckHistories: UserCheckHistory[];
}
