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

    // const parsedSchedule = Object.entries(originSchedule)[2][1];
    // const teacher = await this.usersService.getUserById(
    //   originSchedule.teacher_id
    // );

    // parsedSchedule['teacher'] = teacher;

    // return Promise.all(promisedStudents).then((students) => {
    //   parsedSchedule['students'] = students;
    //   return parsedSchedule;
    // });
  }

  async getSchedule(id) {
    return await this.scheduleModel.findById(id);
  }

  async getSchedules() {
    return await this.scheduleModel.find();
  }

  //   async getAllClass(): Promise<Class> {
  //     const Class = await this.scheduleModel.find({});
  //     return Class;
  //   }
}
