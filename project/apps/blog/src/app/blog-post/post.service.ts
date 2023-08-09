import { Injectable } from '@nestjs/common';
import { BasePublication, PublicationType } from '@project/shared/app-types';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly publicationRepository: PostRepository
  ) {}

  async createPublication(dto: CreatePostDto) {
    const { title, tags, type, videoLink, excerpt, content, quoteText, photo, url, description, createdAt, publishedAt, state } = dto;
  
    const publication: BasePublication = {
      title,
      tags,
      createdAt,
      publishedAt,
      state,
      userId: undefined,
      comments: [] //handle author assignment later
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
  
    const publicationEntity = new PostEntity(publication);
  
    return this.publicationRepository.create(publicationEntity);
  }

  async getPublicationById(publicationId: number): Promise<BasePublication | null> {
    const publication = await this.publicationRepository.findById(publicationId);
    return publication;
  }

  async updatePublication(publicationId: number, publicationData: Partial<BasePublication>): Promise<BasePublication | null> {
    const existingPublication = await this.publicationRepository.findById(publicationId);
  
    if (!existingPublication) {
      return null;
    }
  
    const updatedPublication = new PostEntity({
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

  public async deletePublication(publicationId: number): Promise<boolean> {
    const publicationExists = await this.publicationRepository.findById(publicationId);

    if (!publicationExists) {
      return false;
    }

    await this.publicationRepository.destroy(publicationId);
    return true;
  }
}
