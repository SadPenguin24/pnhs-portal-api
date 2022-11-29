import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from '../roles/role.enum';
import { Faculty } from '../schema/faculty.schema';
import { Student } from '../schema/student.schema';
import { Profile } from '../schema/profile';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  last_name: string;
  @Prop()
  first_name: string;
  @Prop()
  middle_name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  role: Role[];
  @Prop()
  admin: [];
  @Prop()
  faculty: Faculty;
  @Prop()
  student: Student;
  @Prop()
  profile: Profile;
  @Prop()
  section_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
