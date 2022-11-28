import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Section } from './section.schema';

export type FacultyDocument = Faculty & Document;

@Schema()
export class Faculty {
  @Prop()
  section_ids: string[];
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
