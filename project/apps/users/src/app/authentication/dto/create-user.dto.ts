import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Keks',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User date register',
    example: '2023-07-25T12:00:00Z'
  })
  public dateRegister: Date;

  @ApiProperty({
    description: 'User avatar',
    example: 'user.png'
  })
  public avatar: string;
}
