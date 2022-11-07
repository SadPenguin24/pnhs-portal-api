import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EnrolleeDocument } from './enrollees.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EnrolleeService {
  constructor(
    @InjectModel('enrollee')
    private enrolleeModel: Model<EnrolleeDocument>
  ) {}

  async getEnrollees() {
    return await this.enrolleeModel.find();
  }

  async createEnrollee(body) {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      password,
      c_password,
      address,
      phone_number,
      birth_certificate,
      picture_2x2,
      grade_10_card,
      lrn,
      good_moral,
      strand,
    } = body;

    let hashPass;

    if (password === c_password) hashPass = await bcrypt.hash(password, 10);

    return await this.enrolleeModel.create({
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      email: email,
      password: hashPass,
      address: address,
      phone_number: phone_number,
      birth_certificate: birth_certificate,
      picture_2x2: picture_2x2,
      grade_10_card: grade_10_card,
      lrn: lrn,
      good_moral: good_moral,
      strand: strand,
    });
  }

  async getEnrolleeById(id) {
    return await this.enrolleeModel.findById({ _id: id });
  }
}
