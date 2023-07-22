import { Injectable } from '@nestjs/common';
import { PublicationMemoryRepository } from './publication-memory.repository';
import { BasePublication, PublicationType } from '@project/shared/app-types';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationEntity } from './publication.entity';
import dayjs from 'dayjs';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationMemoryRepository
  ) {}

  async createPublication(dto: CreatePublicationDto) {
    const { title, tags, type, videoLink, excerpt, content, quoteText, author, photo, url, description, createdAt, publishedAt, state } = dto;
  
    const publication: BasePublication = {
      title,
      tags,
      createdAt,
      publishedAt,
      state,
      author: undefined, //handle author assignment later
    };
  
    switch (type) {
      case 'video':
        publication.type = PublicationType.Video;
        publication.videoLink = videoLink;
        break;
      case 'text':
        publication.type = PublicationType.Text;
        publication.excerpt = excerpt;
        publication.content = content;
        break;
      case 'quote':
        publication.type = PublicationType.Quote;
        publication.quoteText = quoteText;
        break;
      case 'photo':
        publication.type = PublicationType.Photo;
        publication.photo = photo;
        break;
      case 'link':
        publication.type = PublicationType.Link;
        publication.url = url;
        publication.description = description;
        break;
      default:
        
        break;
    }
  
    const publicationEntity = new PublicationEntity(publication);
  
    return this.publicationRepository.create(publicationEntity);
  }

  async getPublicationById(publicationId: string): Promise<BasePublication | null> {
    const publication = await this.publicationRepository.findById(publicationId);
    return publication;
  }

  async updatePublication(publicationId: string, publicationData: Partial<BasePublication>): Promise<BasePublication | null> {
    const existingPublication = await this.publicationRepository.findById(publicationId);
  
    if (!existingPublication) {
      return null;
    }
  
    const updatedPublication = new PublicationEntity({
      ...existingPublication,
      ...publicationData,
    });
  
    const result = await this.publicationRepository.update(publicationId, updatedPublication);
  
    if (result) {
      return updatedPublication.toObject();
    } else {
      return null;
    }
  }

  public async deletePublication(publicationId: string): Promise<boolean> {
    const publicationExists = await this.publicationRepository.findById(publicationId);

    if (!publicationExists) {
      return false;
    }

    await this.publicationRepository.destroy(publicationId);
    return true;
  }
}
