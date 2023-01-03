import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CurriculumDocument } from '../schema/curriculum.schema';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectModel('curriculum')
    private curriculumModel: Model<CurriculumDocument>
  ) {}

  async createCurriculum(body) {
    const { school_year, strand, grade_level, term, subject_ids } = body;
    return await this.curriculumModel.create({
      _id: new Types.ObjectId(),
      school_year,
      strand,
      grade_level,
      term,
      subject_ids,
    });
  }

  async updateCurriculum(id, body) {
    const { school_year, strand, grade_level, term, subject_ids } = body;
    return await this.curriculumModel.findById(id, {
      _id: new Types.ObjectId(),
      school_year,
      strand,
      grade_level,
      term,
      subject_ids,
    });
  }

  async getCurriculum(id) {
    return await this.curriculumModel.findById(id);
  }

  async getAllCurriculum() {
    return await this.curriculumModel.find();
  }
}
