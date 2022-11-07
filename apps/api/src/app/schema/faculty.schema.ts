import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Section } from './section.schema';

export type FacultyDocument = Faculty & Document;

@Schema()
export class Faculty {
  @Prop()
  subjects_id: string[];
  @Prop()
  section: Section;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
