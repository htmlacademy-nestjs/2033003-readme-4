import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { BlogUserModel, BlogUserSchema } from '../blog-user/blog-user.model';
import { CommentModel, CommentSchema } from './comment.model';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema },
    { name: CommentModel.name, schema: CommentSchema }
  ])],
  controllers: [CommentController],
  providers: [CommentService, AuthenticationService, BlogUserRepository, CommentRepository]
})
export class CommentModule {}
