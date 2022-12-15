import {
  Controller,
  UseGuards,
  Body,
  Request,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('manage')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post')
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }
}
