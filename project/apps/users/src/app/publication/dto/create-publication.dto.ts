import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsDateString, Length, ArrayMaxSize, ArrayMinSize, ArrayUnique, ValidateIf } from 'class-validator';
import { PublicationConstraints } from '../publication.constant';
import { PublicationState, PublicationType, User } from '@project/shared/app-types';

export class CreatePublicationDto {
  @ApiProperty({
    description: `Title of the publication (required). Min length: ${PublicationConstraints.MIN_TITLE_LENGTH} characters, max length: ${PublicationConstraints.MAX_TITLE_LENGTH}.`,
    example: 'Awesome Text Title',
  })
  @IsNotEmpty()
  @IsString()
  @Length(PublicationConstraints.MIN_TITLE_LENGTH, PublicationConstraints.MAX_TITLE_LENGTH)
  title: string;

  @ApiProperty({
    description: `List of tags for the publication (optional). Max size: ${PublicationConstraints.MAX_TAGS_COUNT} tags, each tag min length: ${PublicationConstraints.MIN_TAG_LENGTH} characters, max length: ${PublicationConstraints.MAX_TAG_LENGTH}.`,
    example: ['tag1', 'tag2', 'tag3'],
  })
  @ArrayMaxSize(PublicationConstraints.MAX_TAGS_COUNT)
  @ArrayMinSize(0)
  @ArrayUnique()
  @IsString({ each: true })
  @Length(PublicationConstraints.MIN_TAG_LENGTH, PublicationConstraints.MAX_TAG_LENGTH, { each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Type of the publication (required).',
    enum: ['video', 'text', 'quote', 'photo', 'link'],
  })
  @IsNotEmpty()
  @IsString()
  type: PublicationType;

  // Fields specific to each type of publication
  @ValidateIf((o) => o.type === 'video')
  @ApiProperty({
    description: `URL link (required for type "video").`,
    example: 'https://www.youtube.com/watch?v=your-video-id',
  })
  @IsUrl()
  videoLink?: string;

  @ValidateIf((o) => o.type === 'text')
  @ApiProperty({
    description: `Excerpt of the publication (required for type "text"). Min length: ${PublicationConstraints.MIN_EXCERPT_LENGTH} characters, max length: ${PublicationConstraints.MAX_EXCERPT_LENGTH}.`,
    example: 'This is a short excerpt of the text publication.',
  })
  @IsString()
  @Length(PublicationConstraints.MIN_EXCERPT_LENGTH, PublicationConstraints.MAX_EXCERPT_LENGTH)
  excerpt?: string;

  @ValidateIf((o) => o.type === 'text')
  @ApiProperty({
    description: `Content of the publication (required for type "text"). Min length: ${PublicationConstraints.MIN_CONTENT_LENGTH} characters, max length: ${PublicationConstraints.MAX_CONTENT_LENGTH}.`,
    example: 'This is the main content of the text publication.',
  })
  @IsString()
  @Length(PublicationConstraints.MIN_CONTENT_LENGTH, PublicationConstraints.MAX_CONTENT_LENGTH)
  content?: string;

  @ValidateIf((o) => o.type === 'quote')
  @ApiProperty({
    description: `Text of the quote (required for type "quote"). Min length: ${PublicationConstraints.MIN_QUOTE_LENGTH} characters, max length: ${PublicationConstraints.MAX_QUOTE_LENGTH}.`,
    example: 'This is an inspirational quote that will motivate everyone.',
  })
  @IsString()
  @Length(PublicationConstraints.MIN_QUOTE_LENGTH, PublicationConstraints.MAX_QUOTE_LENGTH)
  quoteText?: string;

  @ValidateIf((o) => o.type === 'quote')
  @ApiProperty({
    description: `Author of the quote (required for type "quote"). Min length: ${PublicationConstraints.MIN_AUTHOR_LENGTH} characters, max length: ${PublicationConstraints.MAX_AUTHOR_LENGTH}.`,
    example: 'Famous Author',
  })
  @IsString()
  @Length(PublicationConstraints.MIN_AUTHOR_LENGTH, PublicationConstraints.MAX_AUTHOR_LENGTH)
  author?: User;

  @ValidateIf((o) => o.type === 'photo')
  @ApiProperty({
    description: 'Photo of the publication (required for type "photo"). Max size: 1MB. Allowed formats: jpg, png.',
    example: 'base64 encoded image',
  })
  @IsString()
  photo?: string;

  @ValidateIf((o) => o.type === 'link')
  @ApiProperty({
    description: `URL link (required for type "link").`,
    example: 'https://example.com/article',
  })
  @IsUrl()
  url?: string;

  @ValidateIf((o) => o.type === 'link')
  @ApiProperty({
    description: `Description of the link (optional for type "link"). Max length: ${PublicationConstraints.MAX_QUOTE_LENGTH} characters.`,
    example: 'A brief description of the linked article.',
  })
  @IsString()
  @Length(0, PublicationConstraints.MAX_QUOTE_LENGTH)
  description?: string;

  // Common fields for all types of publication
  @ApiProperty({
    description: 'Creation date of the publication.',
    example: '2023-07-20T12:00:00Z',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'Publication date of the publication.',
    example: '2023-07-20T12:00:00Z',
  })
  @IsDateString()
  publishedAt: Date;

  @ApiProperty({
    description: 'State of the publication (e.g., "draft" or "published").',
    example: 'published',
    enum: ['draft', 'published'],
  })
  @IsNotEmpty()
  @IsString()
  state: PublicationState;
}
