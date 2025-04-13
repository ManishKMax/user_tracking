// src/call-tracking/entities/call-tracking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum CallType {
  INCOMING = 'Incoming',
  OUTGOING = 'Outgoing',
  MISSED = 'Missed',
  REJECTED = 'Rejected',
}

@Entity('call_tracking')
export class CallTracking {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  user_id: string;

  @Column({
    type: 'enum',
    enum: CallType,
  })
  call_type: CallType;

  @Column()
  recording_url: string;

  @Column({ type: 'time' })
  duration: string;

  @Column()
  user_agent: string;

  @Column()
  project_id: string;

  @CreateDateColumn()
  create_date: Date;
}
