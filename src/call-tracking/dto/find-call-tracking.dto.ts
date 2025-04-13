// src/call-tracking/dto/find-call-tracking.dto.ts
import { IsOptional, IsISO8601 } from 'class-validator';

export class FindCallTrackingDto {
  @IsOptional()
  @IsISO8601()
  from_date?: string;

  @IsOptional()
  @IsISO8601()
  to_date?: string;

  @IsOptional()
  id?: number;
}
