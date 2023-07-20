import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {

  @Prop({ required: true })
  roomid: string;

  @Prop({ required: true })
  data: number;
}


export const ScheduleSchema = SchemaFactory.createForClass(Schedule);