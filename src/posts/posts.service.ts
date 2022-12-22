import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    private readonly categoriesService: CategoriesService,
  ) {}

  async getById(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });
    if (!post || post?.public === 0)
      throw new HttpException('no post', HttpStatus.BAD_REQUEST);

    const category = await this.categoriesService.getById(post.category_id);
    const created_at = new Date(post.created_at).toISOString().split('T')[0];
    return {
      title: post.title,
      content: post.content,
      created_at,
      category,
    };
  }

  async getNew() {
    const posts = await this.postsRepository.findBy({
      public: 1,
    });
    posts.splice(6);
    const _posts = await Promise.all(
      posts.map(async (post) => {
        const category: string = await this.categoriesService.getById(
          post.category_id,
        );

        const _post = { ...post, category: category };
        return _post;
      }),
    );
    return _posts;
  }
}
