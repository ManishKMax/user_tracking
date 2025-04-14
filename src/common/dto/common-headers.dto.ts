import { IsString, IsNotEmpty } from 'class-validator';

export class CommonHeaderDto {
  @IsNotEmpty()
  @IsString()
  project_id: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  user_agent: string;
}
