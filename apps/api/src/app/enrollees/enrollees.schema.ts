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
  @Prop()
  birth_date: string;
  @Prop()
  age: string;
  @Prop()
  sex: string;
  @Prop()
  nationality: string;
  @Prop()
  religion: string;
  @Prop()
  civil_status: string;
  @Prop()
  emergency_contacts: {
    ec_full_name: string;
    ec_relationship: string;
    ec_mobile_number: string;
  }[];
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
