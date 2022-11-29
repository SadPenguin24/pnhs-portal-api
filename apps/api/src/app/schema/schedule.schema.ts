import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  teacher_id: string;
  @Prop()
  subject_id: string;
  @Prop()
  section_id: string;
  @Prop()
  days: string[];
  @Prop()
  time_in: string;
  @Prop()
  time_out: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
