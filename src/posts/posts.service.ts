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
    return post;
  }

  async getNew() {
    const posts = await this.postsRepository.findBy({
      public: 1,
    });
    posts.splice(6);
    const _posts: PostAddedCategory[] = await Promise.all(
      posts.map(async (post) => {
        const category: string = await this.categoriesService.getById(
          post.category_id,
        );

        const _post: PostAddedCategory = { ...post, category: category };
        return _post;
      }),
    );
    return _posts;
  }
}

interface PostAddedCategory {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  public: number;
  category_id: number;
  category: string;
}
