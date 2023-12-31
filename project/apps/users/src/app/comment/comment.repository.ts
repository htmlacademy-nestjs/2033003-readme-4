import { CRUDRepository } from '@project/util/util-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommentEntity } from './comment.entity';
import { CommentModel } from './comment.model';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  public async update(id: string, commentData: UpdateCommentDto): Promise<CommentModel> {
    const existingComment = await this.commentModel.findByIdAndUpdate(
      id,
      { $set: commentData },
      { new: true },
    );

    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }

    return existingComment;
  }

  public async findCommentsByPublication(publicationId: string, limit: number): Promise<Comment[]> {
    const query = this.commentModel.find({ publicationId });

    if (limit) {
      query.limit(limit);
    }

    return await query.exec();
  }

  public async findNextComments(lastCommentId: string, limit: number): Promise<Comment[]> {
    const lastComment = await this.commentModel.findById(lastCommentId).exec();
      if (!lastComment) {
        return null;
      }

      const nextComments = await this.commentModel
      .find({
        $and: [
          { _id: { $gt: lastCommentId } },
          { _id: { $ne: lastCommentId } },
          { publicationId: lastComment.publicationId }
        ]
      })
      .limit(limit)
      .exec();

    return nextComments;
  }
}
