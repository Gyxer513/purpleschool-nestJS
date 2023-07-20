import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ required: true })
  number: 'string';

  @Prop({ required: true })
  description: 'string';

  @Prop({ required: true })
  reserved: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
