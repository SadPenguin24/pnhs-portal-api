import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ReportCard } from './reportCard.schema';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop()
  strand: string;
  @Prop()
  section_id: string;
  @Prop()
  current_grade: string;
  @Prop()
  lrn: string;
  @Prop()
  good_moral: string;
  @Prop()
  birth_certificate: string;
  @Prop()
  grade_10_card: string;
  @Prop()
  report_card: ReportCard[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
