import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role: string;
}
