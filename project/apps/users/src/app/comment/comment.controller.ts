import { CommentRdo } from './rdo/comment.rdo';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../authentication/authentication.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { DEFAULT_LIMIT } from './comment.constant';
import { CommentEntity } from './comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@project/shared/app-types';

@ApiTags('comment')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly commentService: CommentService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.',
    type: [CommentRdo],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @Post()
  public async create(@Body() dto: CreateCommentDto) {
    try {
      const newComment = await this.commentService.create(dto);
      return newComment;
    } catch (error) {
      throw new BadRequestException('Invalid data provided');
    }
  }

  @ApiResponse({
    type: [CommentRdo],
    status: HttpStatus.OK,
    description: 'All comments found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication not found',
  })
  @Get(':id')
  public async find(@Param('id') id: string, @Query('limit') limit?: number) {
    try {
      if (!limit) {
        limit = DEFAULT_LIMIT;
      }
      const comments = await this.commentService.findCommentsByPublication(id, limit);
      return comments;
    } catch (error) {
      throw new NotFoundException('Publication not found');
    }
  }

  @ApiResponse({
    type: [CommentRdo],
    status: HttpStatus.OK,
    description: 'Next comments found by last comment ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication not found',
  })
  @Get(':publicationId/next/:lastCommentId')
  public async findNextComments(
    @Param('lastCommentId') lastCommentId: string,
    @Query('limit') limit?: number,
  ) {
    try {
      if (!limit) {
        limit = DEFAULT_LIMIT;
      }
      const comments = await this.commentService.findNextComments(lastCommentId, limit);
      return comments;
    } catch (error) {
      throw new NotFoundException('Publication not found');
    }
  }  

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You are not authorized to delete this comment',
  })
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    const userId = '64c7e9594191fd8963465142'; // user ID from the authentication process
    const isDeleted = await this.commentService.delete(id, userId);

    if (!isDeleted) {
      throw new NotFoundException('Comment not found');
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment found',
    type: CommentRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You are not authorized to update this comment',
  })
  @Put(':id')
  public async updateComment(@Param('id') id: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
      const userId = '64c7e9594191fd8963465142'; // user ID from the authentication process
      const updatedComment = await this.commentService.updateComment(id, userId, dto);
      return updatedComment;
  }
}
