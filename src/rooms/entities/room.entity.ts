import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'https://i.pinimg.com/originals/15/23/86/152386d3699721e62b78c5fe2960b547.jpg' })
  image: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
