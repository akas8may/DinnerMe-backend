import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(data: any) {
    return this.userModel.create(data);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({email, is_deleted: false});
  }

  async deleteUser(id: string) {

  const user =
    await this.userModel
    .findById(id);

  if (!user) {

    return {
      success: false,
      message: 'User not found',
    };
  }

  // soft delete self

  await this.userModel
  .findByIdAndUpdate(id, {

    is_deleted: true,

    deleted_at:
      new Date(),
  });

  // if husband

  if (user.role === 'husband') {

    await this.userModel
    .updateMany(

      { pid: id },

      {
        is_deleted: true,

        deleted_at:
          new Date(),
      },
    );
  }

  return {

    success: true,

    message:
      'User deleted successfully',
  };
}
}