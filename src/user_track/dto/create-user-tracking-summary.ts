import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateUserTrackingSummaryDto {
  @IsString()
  user_id: string;

  @IsString()
  project_id: string;

  @IsString()
  user_agent: string;

  @IsDateString()
  created: Date;

  @IsOptional()
  @IsDateString()
  checkin?: Date;

  @IsOptional()
  @IsDateString()
  checkout?: Date;

  @IsNumber()
  totalbreak: number;

  @IsOptional()
  @IsDateString()
  break_resume_time?: Date;

  @IsNumber()
  total_hours_worked: number;

  @IsDateString()
  date: string;
}
