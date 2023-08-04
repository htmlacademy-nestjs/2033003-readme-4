import { ApiProperty } from '@nestjs/swagger';
import { BasePublication, PublicationState, PublicationType, User  } from '@project/shared/app-types';
import { Transform } from 'class-transformer';

export class PublicationRdo implements BasePublication {
  @ApiProperty({
    description: 'Unique identifier of the publication',
    example: '123456789',
  })
  @Transform(({obj}) => obj._id.toString())
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
