import { Header } from '@nestjs/common';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class GetTrackingEventsDto {
    
  @IsOptional()
  @IsDateString()
  date?: string;  // Optional query parameter for the date
}
