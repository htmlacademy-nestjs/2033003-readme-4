import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from '../../../blog/src/app/blog-post/post.module';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    CommentModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
