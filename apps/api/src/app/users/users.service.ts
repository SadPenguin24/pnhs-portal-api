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

  async getRole(role_name) {
    const userRole = await this.userModel.find({ role: role_name });
    return userRole;
  }

  async assignSectionToUser(type, user_id, section_id) {
    if (type === 'student') {
      return await this.userModel.findByIdAndUpdate(user_id, {
        'student.section_id': section_id.toString(),
      });
    } else if (type === 'faculty') {
      const teacher = await this.getUserById(user_id);
      if (!teacher.faculty['advisory_section_ids'].includes(section_id)) {
        return await this.userModel.findByIdAndUpdate(user_id, {
          $push: {
            'faculty.advisory_section_ids': section_id.toString(),
          },
        });
      }
      return 'section is already in faculty';
    }
  }

  async insertScheduleToFaculty(teacher_id, schedule_id, section_id) {
    const isHere = await this.userModel.findOne({
      'faculty.handled_subjects': {
        section_id: section_id,
        schedule_id: schedule_id,
      },
    });

    if (!isHere) {
      return await this.userModel.findByIdAndUpdate(teacher_id, {
        $push: {
          'faculty.handled_subjects': {
            section_id: section_id,
            schedule_id: schedule_id,
          },
        },
      });
    } else {
      return 'faculty already has the handled subject';
    }
  }

  async addSubject(id, body) {
    const { subject, term, grade_level, remarks } = body;
    const isHere = await this.userModel.findOne({
      'student.report_card.subject._id': subject._id,
    });

    if (!isHere) {
      return await this.userModel.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            'student.report_card': {
              subject: subject,
              term: term,
              grade_level: grade_level,
              remarks: remarks,
              first_half: 0,
              second_half: 0,
              final_grade: 0,
            },
          },
        }
      );
    } else {
      return isHere;
    }
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

    const new_user = await this.userModel.create({
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
      role: ['student'],
    });

    await this.enrolleeService.deleteEnrolleeById(id);

    return new_user;
  }

  async updateGrade(student_id, subject_id, body) {
    const user = await this.getUserById(student_id);

    const subj_index = user.student.report_card.findIndex((report_card) => {
      return report_card.subject._id.toString() == subject_id;
    });

    const patchedUser = user.student;

    patchedUser.report_card[subj_index].term = body.term;
    patchedUser.report_card[subj_index].remarks = body.remarks;
    patchedUser.report_card[subj_index].grade_level = body.grade_level;
    patchedUser.report_card[subj_index].first_half = body.first_half;
    patchedUser.report_card[subj_index].second_half = body.second_half;
    patchedUser.report_card[subj_index].final_grade = body.final_grade;

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

        if(role === 'faculty'){
          const newUser = await this.userModel.create({
            _id: new Types.ObjectId(),
            last_name: last_name,
            first_name: first_name,
            middle_name: middle_name,
            email: email,
            password: hashPass,
            role: role,
            student: student,
            admin: admin,
            profile: profile,
            faculty: {
              advisory_section_ids: [],
              handled_subjects: []
            },
          });

          return newUser;
        }else{
          const newUser = await this.userModel.create({
            _id: new Types.ObjectId(),
            last_name: last_name,
            first_name: first_name,
            middle_name: middle_name,
            email: email,
            password: hashPass,
            role: role,
            student: student,
            admin: admin,
            profile: profile,
          });

          return newUser;
        }

        
      }
    } catch (err) {
      console.log('error create User: ', err);
    }
  }

  async updateUser(id, body): Promise<User> {
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
    const user = await this.getUserById(id);
    try {
      let hashPass = password;
      if (password) {
        hashPass = await bcrypt.hash(password, 10);
      }

      return await this.userModel.findByIdAndUpdate(id, {
        last_name: last_name ?? user.last_name,
        first_name: first_name ?? user.first_name,
        middle_name: middle_name ?? user.middle_name,
        email: email ?? user.email,
        password: hashPass ?? user.password,
        role: role ?? user.role,
        student: student ?? user.student,
        faculty: faculty ?? user.faculty,
        admin: admin ?? user.admin,
        profile: profile ?? user.profile,
      });
    } catch (err) {
      console.log('error create User: ', err);
    }
  }

  async listStudentStrand(body) {
    const userStrands = await this.userModel.find({
      'student.strand': body.strand,
    });
    return userStrands;
  }
}
