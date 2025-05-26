// src/call-tracking/dto/create-call-tracking.dto.ts
import { IsEnum, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';
import { CallType } from '../entities/call-tracking.entity';
import { Column } from 'typeorm';

export class CreateCallTrackingDto {
  @IsEnum(CallType)
  @IsNotEmpty()
  call_type: CallType;

  @IsString()
  recording_url: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  duration: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;
}
