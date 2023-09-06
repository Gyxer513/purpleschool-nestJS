import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  description: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
