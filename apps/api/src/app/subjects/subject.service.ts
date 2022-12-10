import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubjectDocument } from '../schema/subject.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel('subject')
    private subjectModel: Model<SubjectDocument>
  ) {}

  async createSubject(body) {
    const newSubject = await this.subjectModel.create({
      _id: new Types.ObjectId(),
      subject_name: body.subject_name,
      strand: body.strand,
      type: body.type
    });

    return newSubject;
  }

  async updateSubject(id, body) {
    return await this.subjectModel.findByIdAndUpdate(id, {
      subject_name: body.subject_name,
      strand: body.strand,
      type: body.type
    });
  }

  async getSubject(id) {
    return await this.subjectModel.findById(id);
  }

  async getSubjects() {
    return await this.subjectModel.find();
  }

  //   async getAllClass(): Promise<Class> {
  //     const Class = await this.subjectModel.find({});
  //     return Class;
  //   }
}
