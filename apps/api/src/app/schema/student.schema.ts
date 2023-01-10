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
  school_year: string;
  @Prop()
  current_grade: string;
  @Prop()
  current_term: string;
  @Prop()
  lrn: string;
  @Prop()
  good_moral: boolean;
  @Prop()
  birth_certificate: boolean;
  @Prop()
  grade_10_card: boolean;
  @Prop()
  report_card: ReportCard[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
