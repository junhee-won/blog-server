import {
  Controller,
  UseGuards,
  Body,
  Param,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('new')
  async getNew() {
    return await this.postsService.getNew();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.postsService.getById(id);
  }
}

@Controller('manage')
export class PostsManageController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post')
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  async getAll() {
    return await this.postsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put('post')
  async update(@Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(updatePostDto);
  }
}
