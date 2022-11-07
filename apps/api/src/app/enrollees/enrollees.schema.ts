import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnrolleeDocument = Enrollee & Document;

@Schema()
export class Enrollee {
  @Prop()
  first_name: string;
  @Prop()
  middle_name: string;
  @Prop()
  last_name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  address: string;
  @Prop()
  phone_number: string;
  @Prop()
  lrn: string;
  @Prop()
  strand: string;
  // base64 images
  @Prop()
  birth_certificate: string;
  @Prop()
  picture_2x2: string;
  @Prop()
  grade_10_card: string;
  @Prop()
  good_moral: string;
}

export const EnrolleeSchema = SchemaFactory.createForClass(Enrollee);
