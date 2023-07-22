import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, ArrayMaxSize, ArrayMinSize, ArrayUnique } from 'class-validator';
import { PublicationConstraints } from '../publication.constant'

export class CreatePhotoPublicationDto {
  @ApiProperty({
    description: 'Photo of the publication (required). Max size: 1MB. Allowed formats: jpg, png.',
    example: 'base64 encoded image',
  })
  @IsNotEmpty()
  @IsString()
  photo: string;

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