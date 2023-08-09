import { Entity } from '@project/util/util-types';
import { BasePublication, Comment } from '@project/shared/app-types';
import { PublicationState, PublicationType } from '@prisma/client';

export class PostEntity implements Entity<PostEntity>, BasePublication {
  _id?: string;

  title: string;

  tags?: string[];

  createdAt: Date;

  publishedAt: Date;

  state: PublicationState;

  userId: string;

  type: PublicationType;

  videoLink?: string;

  excerpt?: string;

  content?: string;

  quoteText?: string;

  photo?: string;

  url?: string;

  description?: string;

  comments: Comment[]

  constructor(post: BasePublication) {
    this.fillEntity(post);
  }

  public toObject(): PostEntity {
    return {
      ...this,
      comments: [...this.comments]
    };
  }

  public fillEntity(publicationData: BasePublication) {
    this.title = publicationData.title;
    this.tags = publicationData.tags;
    this.createdAt = publicationData.createdAt;
    this.publishedAt = publicationData.publishedAt;
    this.state = publicationData.state;
    this.userId = publicationData.userId;
    this.comments = publicationData.comments;

    switch (publicationData.type) {
      case PublicationType.Video:
        this.type = PublicationType.Video;
        this.videoLink = publicationData.videoLink;
        break;
      case PublicationType.Text:
        this.type = PublicationType.Text;
        this.excerpt = publicationData.excerpt;
        this.content = publicationData.content;
        break;
      case PublicationType.Quote:
        this.type = PublicationType.Quote;
        this.quoteText = publicationData.quoteText;
        this.userId = publicationData.userId;
        break;
      case PublicationType.Photo:
        this.type = PublicationType.Photo;
        this.photo = publicationData.photo;
        break;
      case PublicationType.Link:
        this.type = PublicationType.Link;
        this.url = publicationData.url;
        this.description = publicationData.description;
        break;
      default:
        // Возможно, здесь будет обработка ошибки или другая логика по умолчанию
        break;
    }
  }
}
