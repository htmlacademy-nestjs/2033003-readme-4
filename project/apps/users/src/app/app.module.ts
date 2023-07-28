import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentModule } from './comment/comment.module';
import { PublicationModule } from './publication/publication.module';
import { ConfigUsersModule, getMongooseOptions } from 'libs/config/config-users/src';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    CommentModule,
    PublicationModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
  )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
