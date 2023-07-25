import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { CommentMemoryRepository } from './comment-memory.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, AuthenticationService, BlogUserMemoryRepository, CommentMemoryRepository]
})
export class CommentModule {}
