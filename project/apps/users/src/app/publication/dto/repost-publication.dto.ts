import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RepostPublicationDto {
  @ApiProperty({
    description: 'ID of the original publication that is being reposted (required).',
    example: 'abcd1234',
  })
  @IsNotEmpty()
  @IsString()
  originalPublicationId: string;
}
