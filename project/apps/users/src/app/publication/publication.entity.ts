import { BasePublication, PublicationState, PublicationType, User } from '@project/shared/app-types';
import { BlogUserEntity } from '../blog-user/blog-user.entity';

export class PublicationEntity {
  _id?: string;

  title: string;

  tags?: string[];

  createdAt: Date;

  publishedAt: Date;

  state: PublicationState;

  author?: User;

  type: PublicationType;

  videoLink?: string;

  excerpt?: string;

  content?: string;

  quoteText?: string;

  photo?: string;

  url?: string;

  description?: string;

  constructor(publication: BasePublication) {
    this.fillEntity(publication);
  }

  public toObject() {
    return {
      _id: this._id,
      title: this.title,
      tags: this.tags,
      createdAt: this.createdAt,
      publishedAt: this.publishedAt,
      state: this.state,
      author: this.author,
      type: this.type,
      ...(this.type === PublicationType.Video && { videoLink: this.videoLink }),
      ...(this.type === PublicationType.Text && { excerpt: this.excerpt, content: this.content }),
      ...(this.type === PublicationType.Quote && { quoteText: this.quoteText, author: this.author }),
      ...(this.type === PublicationType.Photo && { photo: this.photo }),
      ...(this.type === PublicationType.Link && { url: this.url, description: this.description }),
    };
  }

  public fillEntity(publicationData: BasePublication) {
    this.title = publicationData.title;
    this.tags = publicationData.tags;
    this.createdAt = publicationData.createdAt;
    this.publishedAt = publicationData.publishedAt;
    this.state = publicationData.state;
    this.author = publicationData.author;

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
        this.author = publicationData.author;
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
