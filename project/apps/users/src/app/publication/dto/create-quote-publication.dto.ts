import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, MinLength, MaxLength, Length, ArrayMaxSize, ArrayMinSize, ArrayUnique } from 'class-validator';
import { PublicationConstraints } from '../publication.constant'

export class CreateQuotePublicationDto {
  @ApiProperty({
    description: `Text of the quote (required). Min length: ${PublicationConstraints.MIN_QUOTE_LENGTH} characters, max length: ${PublicationConstraints.MAX_QUOTE_LENGTH}.`,
    example: 'This is an inspirational quote that will motivate everyone.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(PublicationConstraints.MIN_QUOTE_LENGTH, PublicationConstraints.MAX_QUOTE_LENGTH)
  quoteText: string;

  @ApiProperty({
    description: `Author of the quote (required). Min length: ${PublicationConstraints.MIN_AUTHOR_LENGTH} characters, max length: ${PublicationConstraints.MAX_AUTHOR_LENGTH}.`,
    example: 'Famous Author',
  })
  @IsNotEmpty()
  @IsString()
  @Length(PublicationConstraints.MIN_AUTHOR_LENGTH, PublicationConstraints.MAX_AUTHOR_LENGTH)
  author: string;

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
