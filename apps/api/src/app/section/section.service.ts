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
    const parsedSection = await this.sectionModel.create({
      _id: new Types.ObjectId(),
      section_name: body.section_name,
      term: body.term,
      grade_level: body.grade_level,
      strand: body.strand,
      teacher_id: body.teacher_id,
      schedules_id: body.schedules_id,
      school_year: body.school_year,
    });

    if (parsedSection) {
      await this.usersService.assignSectionToUser(
        'faculty',
        body.teacher_id,
        parsedSection._id
      );
    }

    return parsedSection;
  }

  async facultySectionHandler() {
    const sections = await this.getSections();
    return Promise.all(
      sections.map(async (section) => {
        return await this.usersService.assignSectionToUser(
          'faculty',
          section.teacher_id,
          section._id
        );
      })
    );
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
      term: body.term ?? section.term,
      grade_level: body.grade_level ?? section.grade_level,
      strand: body.strand ?? section.strand,
      students_id: body.students_id ?? section.students_id,
      schedules_id: body.schedules_id ?? section.schedules_id,
      school_year: body.school_year ?? section.school_year,
    });

    if (body.students_id) {
      body.students_id.map((id) =>
        this.usersService.assignSectionToUser('student', id, parsedSection._id)
      );
    }
    if (body.teacher_id) {
      this.usersService.assignSectionToUser(
        'faculty',
        body.teacher_id,
        parsedSection._id
      );
    }
      const theBody = { section_id: parsedSection._id };
      parsedSection.schedules_id.map(async (schedule_id) => {
        await this.scheduleService.updateSchedule(schedule_id, theBody);
        const subject = await this.scheduleService.getParsedSchedule(
          schedule_id
        );
        const reportCardBody = {
          subject: subject.subject,
          term: parsedSection.term,
          grade_level: parsedSection.grade_level,
          remarks: '',
        };

        parsedSection.students_id.map(async (id) => {
          await this.usersService.addSubject(id, reportCardBody);
        });
      });
    

    return parsedSection;
  }

  async addSubjectToSection(body) {
    const { section_id, subject_id, term, grade_level } = body;
    const subject = await this.subjectService.getSubject(subject_id);
    const section = await this.getSection(section_id);
    section.students_id.map(async (id) => {
      await this.usersService.addSubject(id, { subject, term, grade_level });
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

  async addScheduleToSection(section_id, schedule_id, body) {
    const section = await this.getSection(section_id);
    const schedule = await this.scheduleService.getSchedule(schedule_id);
    section.students_id.map(async (id) => {
      await this.usersService.addSubject(id, body);
    });
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
        async (id) => await this.scheduleService.getParsedSchedule(id)
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

  async getAllParsedSections() {
    const sections = await this.getSections();
    return await Promise.all(
      sections.map(
        async (section) => await this.getParsedSection(section['_id'])
      )
    );
  }
}
