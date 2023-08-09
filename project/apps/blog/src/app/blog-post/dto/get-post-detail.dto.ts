import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPostDetailDto {
  @ApiProperty({
    description: 'ID of the publication to get detailed information about (required).',
    example: 'abcd1234',
  })
  @IsNotEmpty()
  @IsString()
  publicationId: string;
}
