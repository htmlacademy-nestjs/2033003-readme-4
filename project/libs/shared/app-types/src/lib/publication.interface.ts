import { Comment } from '@project/shared/app-types';
import { PublicationState, PublicationType } from '@prisma/client';

export interface BasePublication {
  _id?: string;
  title: string;
  tags?: string[];
  createdAt?: Date;
  publishedAt?: Date;
  state: PublicationState;
  userId?: string;
  type?: PublicationType;
  videoLink?: string;
  excerpt?: string;
  content?: string;
  quoteText?: string;
  photo?: string;
  url?: string;
  description?: string;
  comments: Comment[];
}