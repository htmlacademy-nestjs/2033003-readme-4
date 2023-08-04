import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Publication ID for which the comment is updated',
    example: '123456789',
    required: true,
  })
  public publicationId: string;

  @ApiProperty({
    description: 'Author ID for which the comment is updated',
    example: '123456789',
    required: true,
  })
  public authorId: string;

  @ApiProperty({
    description: 'Text of the comment',
    example: 'Updated comment text',
    required: true,
  })
  public text: string;
}
