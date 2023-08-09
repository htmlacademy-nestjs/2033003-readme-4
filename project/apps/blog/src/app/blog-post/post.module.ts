import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PrismaService } from 'libs/models/blog-models/src/prisma/prisma.service';

@Module({
  //providers: [PostService, AuthenticationService, PublicationMemoryRepository, BlogUserMemoryRepository],
  //controllers: [PublicationController],
  controllers: [PostController],
  providers: [PostService, PostRepository, PrismaService],
})
export class PostModule {}
