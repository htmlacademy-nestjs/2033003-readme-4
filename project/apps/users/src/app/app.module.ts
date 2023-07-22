import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [BlogUserModule, AuthenticationModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
