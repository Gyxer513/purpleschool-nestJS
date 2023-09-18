import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule {

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  date: Date;
}


export const ScheduleSchema = SchemaFactory.createForClass(Schedule);