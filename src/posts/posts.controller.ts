import { Controller, Param, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostSummary } from './interface';
import { PostPage } from './interface';
@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('new')
  async getNew(): Promise<PostSummary[]> {
    return await this.postsService.getNew();
  }

  @Get('all')
  async getAll(): Promise<any[]> {
    return await this.postsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<PostPage> {
    return await this.postsService.getById(id);
  }
}
