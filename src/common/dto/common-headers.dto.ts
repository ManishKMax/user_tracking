import { IsString } from 'class-validator';

export class CommonHeaderDto {
  @IsString()
  user_agent: string;

  @IsString()
  user_id: string;

  @IsString()
  project_id: string;
}
