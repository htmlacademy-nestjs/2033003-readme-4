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
    const comments = Object.values(this.commentModel).filter((comment) => comment._id === publicationId);

    if (limit) {
      return comments.slice(0, limit);
    }

    return comments;
  }

  public async findNextComments(lastCommentId: string, limit: number): Promise<Comment[]> {
    const allComments: Comment[] = await this.findAll();
    const startIndex = allComments.findIndex((comment) => comment._id === lastCommentId);

    if (startIndex === -1) {
      return null;
    }

    const nextComments: Comment[] = allComments.slice(startIndex + 1, startIndex + 1 + limit);

    return nextComments;
  }
}
