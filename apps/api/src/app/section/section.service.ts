import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SectionDocument } from '../schema/section.schema';
import { SubjectService } from '../subjects/subject.service';
import { UsersService } from '../users/users.service';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel('section')
    private sectionModel: Model<SectionDocument>,
    private readonly usersService: UsersService,
    private readonly subjectService: SubjectService,
    private readonly scheduleService: ScheduleService
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
      schedules_id: body.schedules_id,
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
  async updateSection(id, body) {
    const students = await this.usersService.getRole(body.role);
    const section = await this.getSection(id);

    const classStudents = [];

    if (body.students_id) {
      body.students_id.map((student) => {
        students.map((v) => {
          if (v._id.toString() === student) {
            classStudents.push(v);
          }
        });
      });
    }

    const parsedSection = await this.sectionModel.findByIdAndUpdate(id, {
      section_name: body.section_name ?? section.section_name,
      teacher_id: body.teacher_id ?? section.teacher_id,
      students_id: body.students_id ?? section.students_id,
      schedules_id: body.schedules_id ?? section.schedules_id,
      school_year: body.school_year ?? section.school_year,
    });

    if (body.students_id) {
      body.students_id.map((id) =>
        this.usersService.assignSectionToUser('student', parsedSection, id)
      );
    }
    if (body.teacher_id) {
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

  async addScheduleToSection(section_id, schedule_id) {
    return await this.sectionModel.findByIdAndUpdate(
      { _id: section_id },
      {
        $push: {
          schedules_id: schedule_id,
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

    const promisedStudents = await Promise.all(
      originSection.students_id.map(
        async (id) => await this.usersService.getUserById(id)
      )
    );
    const promisedSchedules = await Promise.all(
      originSection.schedules_id.map(
        async (id) => await this.scheduleService.getSchedule(id)
      )
    );

    delete parsedSection.students_id;
    delete parsedSection.schedules_id;
    delete parsedSection.teacher_id;

    parsedSection['teacher'] = faculty;
    parsedSection['students'] = promisedStudents;
    parsedSection['schedules'] = promisedSchedules;

    return parsedSection;
  }
}
