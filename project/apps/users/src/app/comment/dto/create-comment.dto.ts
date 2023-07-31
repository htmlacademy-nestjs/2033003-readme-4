import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Publication ID for which the comment is created',
    example: '123456789',
  })
  public publicationId: string;

  @ApiProperty({
    description: 'Author ID for which the comment is created',
    example: '123456789',
  })
  public authorId: string;

  @ApiProperty({
    description: 'Text of the comment',
    example: 'Great post!',
  })
  public text: string;
}
