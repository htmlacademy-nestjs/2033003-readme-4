import { ApiProperty } from '@nestjs/swagger';
import { User } from '@project/shared/app-types';
import { CreateUserDto } from '../../authentication/dto/create-user.dto';

export class CommentRdo {
  @ApiProperty({
    description: 'Unique identifier of the comment',
    example: '123456789',
  })
  public _id: string;

  @ApiProperty({
    description: 'Text of the comment',
    example: 'Great post!',
  })
  public text: string;

  @ApiProperty({
    description: 'Author of the comment',
    type: () =>[CreateUserDto],
  })
  public author: User;

  @ApiProperty({
    description: 'Date when the comment was created',
    example: '2023-07-25T12:00:00Z',
  })
  public createdAt: Date;
}
