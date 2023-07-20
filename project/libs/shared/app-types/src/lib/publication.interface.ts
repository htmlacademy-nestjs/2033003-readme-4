import { PublicationType } from "./publication-type.enum";

interface BasePublication {
  id: string;
  title: string;
  tags?: string[];
  createdAt: Date;
  publishedAt: Date;
  state: PublicationState;
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
  author: string;
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
