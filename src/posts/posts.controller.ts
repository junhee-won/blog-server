import { Controller, Param, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

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
