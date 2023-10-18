import { IsDate, IsOptional, IsString } from "class-validator";
export class CreateRoomDto {

  @IsString()
  number: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;
}
