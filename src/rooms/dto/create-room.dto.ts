import { IsString } from "class-validator";
export class CreateRoomDto {

  @IsString()
  number: string;

  @IsString()
  description: string;
  
}
