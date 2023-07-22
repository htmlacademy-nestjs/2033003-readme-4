import { AuthenticationService } from './../authentication/authentication.service';
import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationMemoryRepository } from './publication-memory.repository';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';

@Module({
  providers: [PublicationService, AuthenticationService, PublicationMemoryRepository, BlogUserMemoryRepository],
  controllers: [PublicationController],
})
export class PublicationModule {}
