import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CurriculumDocument = Curriculum & Document;

@Schema()
export class Curriculum {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  school_year: string;
  @Prop()
  strand: string;
  @Prop()
  grade_level: string;
  @Prop()
  term: string;
  @Prop()
  subject_ids: string[];
}

export const CurriculumSchema = SchemaFactory.createForClass(Curriculum);
