import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FacultyDocument = Faculty & Document;

@Schema()
export class Faculty {
  @Prop()
  advisory_section_ids: string[];
  @Prop()
  handled_subjects: {
    section_id: string;
    schedule_id: string;
  }[];
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
