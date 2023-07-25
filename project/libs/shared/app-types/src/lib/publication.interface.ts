import { User, PublicationState, PublicationType } from '@project/shared/app-types';

export interface BasePublication {
  _id?: string;
  title: string;
  tags?: string[];
  createdAt: Date;
  publishedAt: Date;
  state: PublicationState;
  author?: User;
  type?: PublicationType;
  videoLink?: string;
  excerpt?: string;
  content?: string;
  quoteText?: string;
  photo?: string;
  url?: string;
  description?: string;
}

interface VideoPublication extends BasePublication {
  type: PublicationType.Video;
  videoLink: string;
}

interface TextPublication extends BasePublication {
  type: PublicationType.Text;
  excerpt: string;
  content: string;
}

interface QuotePublication extends BasePublication {
  type: PublicationType.Quote;
  quoteText: string;
  author: User;
}

interface PhotoPublication extends BasePublication {
  type: PublicationType.Photo;
  photo: string;
}

interface LinkPublication extends BasePublication {
  type: PublicationType.Link;
  url: string;
  description?: string;
}

export type Publication = VideoPublication | TextPublication | QuotePublication | PhotoPublication | LinkPublication;
