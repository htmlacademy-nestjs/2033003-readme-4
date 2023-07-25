import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentModule } from './comment/comment.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    CommentModule,
    PublicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
