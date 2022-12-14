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
  picture_2x2: boolean;
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
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
