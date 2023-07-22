import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';
import { CommentEntity } from './comment.entity';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentMemoryRepository implements CRUDRepository<CommentEntity, string, Comment> {
  private repository: Record<string, Comment> = {};

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: randomUUID() };
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<Comment> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findAll(): Promise<Comment[]> {
    return Object.values(this.repository);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.findById(id);
  }

  public async findCommentsByPublication(publicationId: string, limit: number): Promise<Comment[]> {
    const comments = Object.values(this.repository).filter((comment) => comment._id === publicationId);

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
