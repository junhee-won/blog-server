import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async getById(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });
    if (!post || post?.public === 0)
      throw new HttpException('no post', HttpStatus.BAD_REQUEST);
    return post;
  }

  async getNew() {
    const posts = await this.postsRepository.findBy({
      public: 1,
    });
    posts.splice(5);
    return posts;
  }
}
