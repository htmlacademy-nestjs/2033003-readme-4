import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationService } from './../authentication/authentication.service';
import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationMemoryRepository } from './publication-memory.repository';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { BlogUserModel, BlogUserSchema } from '../blog-user/blog-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema }
  ])],
  providers: [PublicationService, AuthenticationService, PublicationMemoryRepository, BlogUserRepository],
  controllers: [PublicationController],
})
export class PublicationModule {}
