import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { ICreateUser, IUpdateUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByIds(userIds: string[]): Promise<User[]> {
    return this.userModel.find({ userId: { $in: userIds } }).exec();
  }

  async updateUser(payload: IUpdateUser) {
    const { userId, fullName, avatar } = payload;
    if (fullName) {
      return this.userModel.updateOne({ userId }, { fullName });
    }
    if (avatar) {
      return this.userModel.updateOne({ userId }, { avatar });
    }
  }

  async createUser(payload: ICreateUser) {
    const { userId, fullName, avatar } = payload;
    return this.userModel.create({ userId, fullName, avatar });
  }
}
