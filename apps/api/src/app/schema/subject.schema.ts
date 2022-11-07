import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  subject_name: string;
  @Prop()
  strand: string;
  @Prop()
  time_in: Date;
  @Prop()
  time_out: Date;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
