import { IsString, IsUrl } from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  url: string;
}
