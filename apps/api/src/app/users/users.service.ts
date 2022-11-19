import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { EnrolleeService } from '../enrollees/enrollees.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private userModel: Model<UserDocument>,
    private readonly enrolleeService: EnrolleeService
  ) {}

  async getUser(username): Promise<User> {
    const user = await this.userModel.findOne({ email: username });

    return user;
  }

  async getAllUser() {
    const user = await this.userModel.find({}).select(['-password']);

    return user;
  }

  async getUserById(id) {
    const user = await this.userModel
      .findById({
        _id: id,
      })
      .select(['-password']);

    return user;
  }

  async getRole(body) {
    const userRole = await this.userModel.find({ role: body.role || body });
    return userRole;
  }

  async assignSectionToUser(type, section, id) {
    console.log('SECTION: ', section);
    if (type === 'student') {
      return await this.userModel.findByIdAndUpdate(id, {
        section_id: section._id.toString(),
      });
    } else if (type === 'faculty') {
      return await this.userModel.findByIdAndUpdate(id, {
        section_id: section._id.toString(),
      });
    }
  }

  async addSubject(id, subject) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          'student.report_card': { subject: subject, final_grade: 0 },
        },
      }
    );
  }

  async convertEtoS(id) {
    const enrollee = await this.enrolleeService.getEnrolleeById(id);
    const {
      _id,
      first_name,
      middle_name,
      last_name,
      email,
      password,
      address,
      phone_number,
      birth_certificate,
      picture_2x2,
      grade_10_card,
      lrn,
      good_moral,
      strand,
    } = enrollee;

    return await this.userModel.create({
      _id: _id,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      email: email,
      password: password,
      student: { strand: strand },
      profile: {
        address: address,
        phone_number: phone_number,
        birth_certificate: birth_certificate,
        picture_2x2: picture_2x2,
        grade_10_card: grade_10_card,
        lrn: lrn,
        good_moral: good_moral,
      },
    });

    return enrollee;
  }

  async updateGrade(student_id, subject_id, body) {
    const user = await this.getUserById(student_id);

    const subj_index = user.student.report_card.findIndex((report_card) => {
      return report_card.subject._id.toString() == subject_id;
    });

    const patchedUser = user.student;

    patchedUser.report_card[subj_index].final_grade = body.grade;

    return await this.userModel.findByIdAndUpdate(
      { _id: student_id },
      {
        student: patchedUser,
      }
    );
  }

  async createUser(body): Promise<User> {
    const {
      email,
      password,
      last_name,
      first_name,
      middle_name,
      role,
      student,
      faculty,
      admin,
      profile,
    } = body;
    try {
      const existUser = await this.userModel.findOne({
        email: body.email,
      });

      if (existUser) {
        console.log('User Exists');
      } else {
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = await this.userModel.create({
          _id: new Types.ObjectId(),
          last_name: last_name,
          first_name: first_name,
          middle_name: middle_name,
          email: email,
          password: hashPass,
          role: role,
          student: student,
          faculty: faculty,
          admin: admin,
          profile: profile,
        });
        return newUser;
      }
    } catch (err) {
      console.log('error create User: ', err);
    }
  }

  async editUser(id, body) {
    const {
      email,
      password,
      last_name,
      first_name,
      middle_name,
      role,
      student,
      faculty,
      admin,
      profile,
    } = body;

    const existUser = await this.userModel.findById({ _id: id });

    if (existUser) {
      return 'User Exists';
    }
    const hashPass = await bcrypt.hash(password, 10);

    const updateUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        last_name: last_name ? last_name : existUser.last_name,
        first_name: first_name ? first_name : existUser.first_name,
        middle_name: middle_name ? middle_name : existUser.middle_name,
        email: email ? email : existUser.email,
        password: password ? hashPass : existUser.password,
        role: role ? role : existUser.role,
        student: student ? student : existUser.student,
        faculty: faculty ? faculty : existUser.faculty,
        admin: admin ? admin : existUser.admin,
        profile: profile ? profile : existUser.profile,
      }
    );

    return updateUser;
  }

  async listStudentStrand(body) {
    const userStrands = await this.userModel.find({
      'student.strand': body.strand,
    });
    return userStrands;
  }
}
