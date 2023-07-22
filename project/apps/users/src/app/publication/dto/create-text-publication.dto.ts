import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, ArrayMaxSize, ArrayMinSize, ArrayUnique } from 'class-validator';
import { PublicationConstraints } from '../publication.constant'

export class CreateTextPublicationDto {
  @ApiProperty({
    description: `Title of the publication (required). Min length: ${PublicationConstraints.MIN_TITLE_LENGTH} characters, max length: ${PublicationConstraints.MAX_TITLE_LENGTH}.`,
    example: 'Awesome Text Title',
  })
  @IsNotEmpty()
  @IsString()
  @Length(PublicationConstraints.MIN_TITLE_LENGTH, PublicationConstraints.MAX_TITLE_LENGTH)
  title: string;

  @ApiProperty({
    description: `Excerpt of the publication (required). Min length: ${PublicationConstraints.MIN_EXCERPT_LENGTH} characters, max length: ${PublicationConstraints.MAX_EXCERPT_LENGTH}.`,
    example: 'This is a short excerpt of the text publication.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(PublicationConstraints.MIN_EXCERPT_LENGTH, PublicationConstraints.MAX_EXCERPT_LENGTH)
  excerpt: string;

  @ApiProperty({
    description: `Content of the publication (required). Min length: ${PublicationConstraints.MIN_CONTENT_LENGTH} characters, max length: ${PublicationConstraints.MAX_CONTENT_LENGTH}.`,
    example: 'This is the main content of the text publication.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(PublicationConstraints.MIN_CONTENT_LENGTH, PublicationConstraints.MAX_CONTENT_LENGTH)
  content: string;

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
}
