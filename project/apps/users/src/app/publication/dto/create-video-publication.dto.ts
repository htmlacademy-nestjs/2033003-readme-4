import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Length, ArrayMaxSize, ArrayMinSize, ArrayUnique } from 'class-validator';
import { PublicationConstraints } from '../publication.constant'

export class CreateVideoPublicationDto {
  @ApiProperty({
    description: `Title of the publication (required). Min length: ${PublicationConstraints.MIN_TITLE_LENGTH} characters, max length: ${PublicationConstraints.MAX_TITLE_LENGTH}.`,
    example: 'Amazing Video Title',
  })
  @IsNotEmpty()
  @IsString()
  @Length(PublicationConstraints.MIN_TITLE_LENGTH, PublicationConstraints.MAX_TITLE_LENGTH)
  title: string;

  @ApiProperty({
    description: 'Valid URL link to a YouTube video (required).',
    example: 'https://www.youtube.com/shorts/T3FQxH2fz9M',
  })
  @IsNotEmpty()
  @IsUrl()
  videoLink: string;

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


