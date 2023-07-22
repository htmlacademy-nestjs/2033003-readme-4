import { CommentRdo } from './rdo/comment.rdo';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../authentication/authentication.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { DEFAULT_LIMIT } from './comment.constant';

@ApiTags('comment')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly commentService: CommentService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  @Post()
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(dto);
    return newComment;
  }

  @ApiResponse({
    type: [CommentRdo],
    status: HttpStatus.OK,
    description: 'All comments found',
  })
  @Get()
  public async find(@Param('id')id: string, @Query('limit') limit?: number) {
    if (!limit) {
      limit = DEFAULT_LIMIT;
    }
    const comments = await this.commentService.findCommentsByPublication(id, limit);
    return comments;
  }

  @ApiResponse({
    type: [CommentRdo],
    status: HttpStatus.OK,
    description: 'Next comments found by last comment ID',
  })
  @Get('next/:lastCommentId')
  public async findNextComments(
    @Param('lastCommentId') lastCommentId: string,
    @Query('limit') limit?: number,
  ) {
    if (!limit) {
      limit = DEFAULT_LIMIT;
    }

    const comments = await this.commentService.findNextComments(lastCommentId, limit);
    return comments;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment deleted successfully',
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const userId = '123456';
    await this.commentService.delete(id, userId);
    return;
  }
}
