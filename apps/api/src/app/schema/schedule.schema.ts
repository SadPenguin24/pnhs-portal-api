import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop()
  teacher_id: string;
  @Prop()
  subject_id: string;
  @Prop()
  days: string[];
  @Prop()
  time_in: string;
  @Prop()
  time_out: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
