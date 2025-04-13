// src/call-tracking/dto/create-call-tracking.dto.ts
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CallType } from '../entities/call-tracking.entity';

export class CreateCallTrackingDto {
  @IsEnum(CallType)
  call_type: CallType;

  @IsString()
  recording_url: string;

  @IsString()
  duration: string;
}
