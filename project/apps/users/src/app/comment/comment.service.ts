import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { COMMENT_TEXT_MIN_LENGTH, COMMENT_TEXT_MAX_LENGTH } from './comment.constant';
import { CommentEntity } from './comment.entity';
import dayjs from 'dayjs';
import { CommentRepository } from './comment.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  public async create(dto: CreateCommentDto) {
    const { text, publicationId, authorId } = dto;

    if (text.length < COMMENT_TEXT_MIN_LENGTH || text.length > COMMENT_TEXT_MAX_LENGTH) {
      throw new BadRequestException('Invalid comment text length');
    }

    const comment = {
      text,
      createdAt: dayjs().toDate(),
      authorId, //handle author assignment later,
      publicationId,
    };

    
    const commentEntity = await new CommentEntity(comment);
    return this.commentRepository.create(commentEntity);
  }

  public async delete(commentId: string, userId: string): Promise<boolean> {
    const comment = await this.commentRepository.findById(commentId);

    if (!comment) {
      return false;
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You are not authorized to delete this comment');
    }

    await this.commentRepository.destroy(commentId);
    return true;
  }

  public async findCommentsByPublication(publicationId: string, limit: number): Promise<Comment[]> {
    return this.commentRepository.findCommentsByPublication(publicationId, limit);
  }

  public async findNextComments(lastCommentId: string, limit: number): Promise<Comment[]> {
    const comments: Comment[] = await this.commentRepository.findNextComments(lastCommentId, limit);
    if(!comments){
      throw new BadRequestException('Invalid lastCommentId');
    }

    return comments;
  }

  public async updateComment(id: string, userId: string, comment: UpdateCommentDto): Promise<Comment> {
    const commentData = await this.commentRepository.findById(id);
      
    if (!commentData) {
      throw new NotFoundException('Comment not found');
    }
  
    if (commentData.authorId !== userId) {
      throw new ForbiddenException('You are not authorized to update this comment');
    }
  
    const updatedComment = await this.commentRepository.update(id, comment);
    return updatedComment;
  }
}
