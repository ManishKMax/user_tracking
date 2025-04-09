import { IsString, IsDateString } from 'class-validator';

export class CreateTrackingEventDto {
  @IsString()
  user_id: string;

  @IsDateString()
  timestamp: Date;

  @IsString()
  event_type: string;

  @IsString()
  user_agent: string;

  @IsString()
  project_id: string;
}
