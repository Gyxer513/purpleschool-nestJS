import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema({timestamps: true})
export class File {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    url: string
}

export const FileSchema = SchemaFactory.createForClass(File);