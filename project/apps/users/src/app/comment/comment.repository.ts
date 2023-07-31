import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommentEntity } from './comment.entity';
import { CommentModel } from './comment.model';

@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, string, Comment> {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>) {
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const newComment = new this.commentModel(item);
    return newComment.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.commentModel.deleteOne({ _id: id });
  }

  public async findAll(): Promise<Comment[]> {
    return Object.values(this.commentModel);
  }

  public async findById(id: string): Promise<Comment | null> {
    return this.commentModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByEmail(email: string): Promise<Comment | null> {
    return this.commentModel
      .findOne({ email })
      .exec();
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findCommentsByPublication(publicationId: string, limit: number): Promise<Comment[]> {
    const comments = await this.commentModel
        .find({ publicationId })
        .limit(limit)
        .exec();

    console.log(comments)
    if (limit) {
      return comments.slice(0, limit);
    }

    return comments;
  }

  public async findNextComments(lastCommentId: string, limit: number): Promise<Comment[]> {
    const lastComment = await this.commentModel.findById(lastCommentId).exec();
      if (!lastComment) {
        return null;
      }

    const nextComments = await this.commentModel
    .find({ createdAt: { $gt: lastComment.createdAt }, publicationId: lastComment.publicationId })
      .limit(limit)
      .exec();

    return nextComments;
  }
}
