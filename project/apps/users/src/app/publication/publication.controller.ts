import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { BasePublication } from '@project/shared/app-types';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PublicationRdo } from './rdo/photo-publication.rdo';

@Controller('publication')
export class PublicationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly publicationService: PublicationService,
  ) {}

  @Post()
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Publication created successfully' 
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  async createPublication(@Body() dto: CreatePublicationDto): Promise<BasePublication> {
    try {
      return await this.publicationService.createPublication(dto);
    } catch (error) {
      throw new BadRequestException('Invalid data provided');
    }
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication found',
    type: PublicationRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication not found',
  })
  async getPublication(@Param('id') id: string): Promise<BasePublication | null> {
    const publication = await this.publicationService.getPublicationById(id);
    if (!publication) {
      throw new NotFoundException('Publication not found');
    }
    return publication;
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication updated successfully',
    type: PublicationRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  async updatePublication(
    @Param('id') id: string,
    @Body() dto: Partial<CreatePublicationDto>,
  ): Promise<BasePublication | null> {
    const publication = await this.publicationService.updatePublication(id, dto);
    if (!publication) {
      throw new NotFoundException('Publication not found');
    }
    return publication;
  }

  @Delete(':id')
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'Publication deleted successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication not found',
  })
  async deletePublication(@Param('id') id: string): Promise<void> {
    const isDeleted = await this.publicationService.deletePublication(id);
    if (!isDeleted) {
      throw new NotFoundException('Publication not found');
    }
  }
}
