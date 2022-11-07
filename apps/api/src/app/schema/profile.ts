import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop()
  address: string;
  @Prop()
  phone_number: string;
  @Prop()
  birth_certificate: string;
  @Prop()
  picture_2x2: string;
  @Prop()
  grade_10_card: string;
  @Prop()
  lrn: string;
  @Prop()
  good_moral: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
