import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Subject } from './subject.schema';
import { Schedule } from './schedule.schema';

export type SectionDocument = Section & Document;

@Schema()
export class Section {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  section_name: string;
  @Prop()
  teacher_id: string;
  @Prop()
  students_id: string[];
  @Prop()
  school_year: string;
  @Prop()
  subjects: Subject[];
  @Prop()
  schedules_id: string[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
