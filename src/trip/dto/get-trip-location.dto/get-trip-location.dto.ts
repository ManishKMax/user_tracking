import { IsString } from 'class-validator';

export class GetTripLocationDto {
  @IsString()
  user_id: string;

  @IsString()
  project_id: string;

  @IsString()
  date: string;  // Date should be in 'YYYY-MM-DD' format
}
