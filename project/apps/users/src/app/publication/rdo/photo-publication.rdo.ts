import { BasePublication, PublicationState, PublicationType, User  } from '@project/shared/app-types';

export class PublicationRdo implements BasePublication {
  _id: string;

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
}
