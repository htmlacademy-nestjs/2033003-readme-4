import { CRUDRepository } from '@project/util/util-types';
import { isEmail } from '@project/util/util-core';
import { Injectable } from '@nestjs/common';
import { BlogUserEntity } from './blog-user.entity';
import { User } from '@project/shared/app-types';
import { BlogUserModel } from './blog-user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogUserRepository implements CRUDRepository<BlogUserEntity, string, User> {
  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>) {
  }

  public async create(item: BlogUserEntity): Promise<User> {
    const newBlogUser = new this.blogUserModel(item);
    return newBlogUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.blogUserModel
      .findOne({ _id: id })
      .exec();
  }

  public async findUnique(searchParam: string): Promise<User | null> {
    if (isEmail(searchParam)) {
      return this.blogUserModel.findOne({ email: searchParam });
    } else {
      return this.blogUserModel.findOne({ _id: searchParam });
    }
  }

  public async update(id: string, item: BlogUserEntity): Promise<User> {
    return this.blogUserModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
