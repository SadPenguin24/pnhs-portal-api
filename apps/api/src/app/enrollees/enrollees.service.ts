import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async updateEnrollee(id, body) {
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

    const enrollee = await this.getEnrolleeById(id);

    return await this.enrolleeModel.findByIdAndUpdate(id, {
      first_name: first_name ?? enrollee.first_name,
      middle_name: middle_name ?? enrollee.middle_name,
      last_name: last_name ?? enrollee.last_name,
      email: email ?? enrollee.email,
      password: hashPass ?? enrollee.password,
      address: address ?? enrollee.address,
      phone_number: phone_number ?? enrollee.phone_number,
      birth_certificate: birth_certificate ?? enrollee.birth_certificate,
      picture_2x2: picture_2x2 ?? enrollee.picture_2x2,
      grade_10_card: grade_10_card ?? enrollee.grade_10_card,
      lrn: lrn ?? enrollee.lrn,
      good_moral: good_moral ?? enrollee.good_moral,
      strand: strand ?? enrollee.strand,
    });
  }

  async getEnrolleeById(id) {
    return await this.enrolleeModel.findById({ _id: id });
  }

  async deleteEnrolleeById(id) {
    return await this.enrolleeModel.findByIdAndDelete({ _id: id });
  }
}
