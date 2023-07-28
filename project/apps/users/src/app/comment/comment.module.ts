import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CommentMemoryRepository } from './comment-memory.repository';
import { BlogUserModel, BlogUserSchema } from '../blog-user/blog-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema }
  ])],
  controllers: [CommentController],
  providers: [CommentService, AuthenticationService, BlogUserRepository, CommentMemoryRepository]
})
export class CommentModule {}
