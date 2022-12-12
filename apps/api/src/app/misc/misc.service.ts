import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MiscDocument } from '../schema/misc.schema';

@Injectable()
export class MiscService {
  constructor(
    @InjectModel('misc')
    private miscModel: Model<MiscDocument>
  ) {}

  async createMisc(body) {
    const { name, bool_value } = body;
    const misc = await this.miscModel.findOne({ name: name });
    if (!misc) {
      return await this.miscModel.create({
        _id: new Types.ObjectId(),
        name,
        bool_value,
      });
    } else {
      return 'misc already exists';
    }
  }

  async updateBool(body) {
    return await this.miscModel.findOneAndUpdate(
      { name: body.name },
      { bool_value: body.bool_value }
    );
  }

  async getMisc(id) {
    return await this.miscModel.findById(id);
  }

  async getAllMisc() {
    return await this.miscModel.find();
  }
}
