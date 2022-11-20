import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SectionDocument } from '../schema/section.schema';
import { SubjectService } from '../subjects/subject.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel('section')
    private sectionModel: Model<SectionDocument>,
    private readonly usersService: UsersService,
    private readonly subjectService: SubjectService
  ) {}

  async getSection(id) {
    return await this.sectionModel.findById(id);
  }

  async getSections() {
    return await this.sectionModel.find();
  }

  async createSection(body) {
    const students = await this.usersService.getRole(body.role);

    const classStudents = [];

    body.students_id.map((student) => {
      students.map((v) => {
        if (v._id.toString() === student) {
          classStudents.push(v);
        }
      });
    });

    const parsedSection = await this.sectionModel.create({
      _id: new Types.ObjectId(),
      section_name: body.section_name,
      teacher_id: body.teacher_id,
      students_id: body.students_id,
      school_year: body.school_year,
    });

    if (parsedSection) {
      body.students_id.map((id) =>
        this.usersService.assignSectionToUser('student', parsedSection, id)
      );
      this.usersService.assignSectionToUser(
        'faculty',
        parsedSection,
        body.teacher_id
      );
    }

    return parsedSection;
  }

  async addSubjectToSection(section_id, subject_id, term) {
    const subject = await this.subjectService.getSubject(subject_id);
    const section = await this.getSection(section_id);
    section.students_id.map(async (id) => {
      await this.usersService.addSubject(id, subject, term);
    });

    return await this.sectionModel.findByIdAndUpdate(
      { _id: section_id },
      {
        $push: {
          subjects: subject,
        },
      }
    );
  }

  async getParsedSection(id) {
    const originSection = await this.getSection(id);
    const parsedSection = Object.entries(originSection)[2][1];
    const faculty = await this.usersService.getUserById(
      originSection.teacher_id
    );
    const promisedStudents = [];
    await originSection.students_id.map((id) =>
      promisedStudents.push(this.usersService.getUserById(id))
    );

    delete parsedSection.students_id;
    delete parsedSection.teacher_id;

    parsedSection['teacher'] = faculty;

    return Promise.all(promisedStudents).then((students) => {
      parsedSection['students'] = students;
      return parsedSection;
    });
  }

  //   async getAllClass(): Promise<Class> {
  //     const Class = await this.sectionModel.find({});

  //     return Class;
  //   }
}
