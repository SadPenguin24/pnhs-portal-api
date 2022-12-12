import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MiscDocument = Misc & Document;

@Schema()
export class Misc {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  name: string;
  @Prop()
  bool_value: boolean;
}

export const MiscSchema = SchemaFactory.createForClass(Misc);
