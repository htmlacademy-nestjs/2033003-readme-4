import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { BasePublication } from '@project/shared/app-types';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PostRdo } from './rdo/post.rdo';

@Controller('publication')
export class PostController {
  constructor(
    private readonly publicationService: PostService,
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
  async createPublication(@Body() dto: CreatePostDto): Promise<BasePublication> {
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
    type: PostRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication not found',
  })
  async getPublication(@Param('id') id: string): Promise<BasePublication | null> {
    const publication = await this.publicationService.getPublicationById(parseInt(id, 10));
    if (!publication) {
      throw new NotFoundException('Publication not found');
    }
    return publication;
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication updated successfully',
    type: PostRdo,
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
    @Body() dto: Partial<CreatePostDto>,
  ): Promise<BasePublication | null> {
    const publication = await this.publicationService.updatePublication(parseInt(id, 10), dto);
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
    const isDeleted = await this.publicationService.deletePublication(parseInt(id, 10));
    if (!isDeleted) {
      throw new NotFoundException('Publication not found');
    }
  }
}
