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
    return await this.curriculumModel.findByIdAndUpdate(id, {
      school_year: body.school_year,
      strand: body.strand,
      grade_level: body.grade_level,
      term: body.term,
      subject_ids: body.subject_ids,
    });
  }

  async deleteCurriculum(id) {
    return await this.curriculumModel.findByIdAndDelete(id);
  }

  async getCurriculum(id) {
    return await this.curriculumModel.findById(id);
  }

  async getAllCurriculum() {
    return await this.curriculumModel.find();
  }
}
