import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ScheduleDocument } from '../schema/schedule.schema';
import { UsersService } from '../users/users.service';
import { SubjectService } from '../subjects/subject.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('schedule')
    private scheduleModel: Model<ScheduleDocument>,
    private readonly usersService: UsersService,
    private readonly subjectService: SubjectService
  ) {}

  async createSchedule(body) {
    const newSchedule = await this.scheduleModel.create({
      _id: new Types.ObjectId(),
      teacher_id: body.teacher_id,
      subject_id: body.subject_id,
      section_id: body.section_id,
      days: body.days,
      time_in: body.time_in,
      time_out: body.time_out,
    });

    return newSchedule;
  }

  async getParsedSchedule(id) {
    const originSchedule = await this.getSchedule(id);
    const parsedSchedule = Object.entries(originSchedule)[2][1];
    const teacher = await this.usersService.getUserById(
      parsedSchedule.teacher_id
    );
    const subject = await this.subjectService.getSubject(
      parsedSchedule.subject_id
    );

    parsedSchedule['teacher'] = teacher;
    parsedSchedule['subject'] = subject;

    delete parsedSchedule.teacher_id;
    delete parsedSchedule.subject_id;

    return parsedSchedule;
  }

  async getAllParsedSchedules() {
    const schedules = await this.getSchedules();
    return await Promise.all(
      schedules.map(
        async (schedule) => await this.getParsedSchedule(schedule['_id'])
      )
    );
  }

  async assignAllScheduleToFaculty() {
    const schedules = await this.getSchedules();
    schedules.map(async (schedule) => {
      await this.usersService.insertScheduleToFaculty(
        schedule.teacher_id,
        schedule._id,
        schedule.section_id
      );
    });
  }

  async updateSchedule(id, body) {
    const { teacher_id, subject_id, section_id, days, time_in, time_out } =
      body;
    const schedule = await this.getSchedule(id);

    if (section_id) {
      await this.usersService.insertScheduleToFaculty(
        teacher_id ?? schedule.teacher_id,
        id,
        section_id
      );
    }

    return await this.scheduleModel.findByIdAndUpdate(id, {
      teacher_id: teacher_id ?? schedule.teacher_id,
      subject_id: subject_id ?? schedule.subject_id,
      section_id: section_id ?? schedule.section_id,
      days: days ?? schedule.days,
      time_in: time_in ?? schedule.time_in,
      time_out: time_out ?? schedule.time_out,
    });
  }

  async getSchedule(id) {
    return await this.scheduleModel.findById(id);
  }

  async getSchedules() {
    return await this.scheduleModel.find();
  }
}
