import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Subject } from './subject.schema';

export type ReportCardDocument = ReportCard & Document;

@Schema()
export class ReportCard {
  @Prop()
  subject: Subject;
  @Prop()
  grade_level: number;
  @Prop()
  remarks: string;
  @Prop()
  term: number;
  @Prop()
  first_half: number;
  @Prop()
  second_half: number;
  @Prop()
  final_grade: number;
}

export const ReportCardSchema = SchemaFactory.createForClass(ReportCard);
