import { IsString } from "class-validator";
export class CreateScheduleDto {
  @IsString()
  roomId: string;
  
  @IsString()
  date: string;
}
