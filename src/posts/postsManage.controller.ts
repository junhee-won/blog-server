import { Controller, UseGuards, Body, Get, Post, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsManageService } from './postsManage.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('manage')
export class PostsManageController {
  constructor(private readonly postsManageService: PostsManageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post')
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsManageService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  async getAll() {
    return await this.postsManageService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put('post')
  async update(@Body() updatePostDto: UpdatePostDto) {
    return await this.postsManageService.update(updatePostDto);
  }
}
