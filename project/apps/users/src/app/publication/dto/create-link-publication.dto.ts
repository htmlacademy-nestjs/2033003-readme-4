import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Length, ArrayMaxSize, ArrayMinSize, ArrayUnique } from 'class-validator';
import { PublicationConstraints } from '../publication.constant'

export class CreateLinkPublicationDto {
  @ApiProperty({
    description: `URL link (required).`,
    example: 'https://example.com/article',
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({
    description: `Description of the link (optional). Max length: ${PublicationConstraints.MAX_QUOTE_LENGTH} characters.`,
    example: 'A brief description of the linked article.',
  })
  @IsString()
  @Length(0, PublicationConstraints.MAX_QUOTE_LENGTH)
  description?: string;

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