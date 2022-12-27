import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { PostSummary } from './interface';
import { PostPage } from './interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
  ) {}

  async getById(id: number) {
    const post = await this.postsRepository.findOne({
      select: {
        created_at: true,
        title: true,
        content: true,
        category_id: true,
      },
      where: { id: id },
    });
    if (!post || post?.public === 0)
      throw new HttpException('no post', HttpStatus.NOT_FOUND);

    const category = await this.categoriesService.getById(post.category_id);
    const created_at = new Date(post.created_at).toISOString().split('T')[0];
    const _post: PostPage = { ...post, created_at, category };
    return _post;
  }

  async getNew() {
    const posts = await this.postsRepository.find({
      select: {
        id: true,
        created_at: true,
        title: true,
        thumbnail: true,
        category_id: true,
      },
      where: { public: 1 },
      order: { created_at: 'DESC', id: 'DESC' },
    });
    posts.splice(6);

    const _posts = await Promise.all(
      posts.map(async (post) => {
        const category: string = await this.categoriesService.getById(
          post.category_id,
        );
        const created_at: string = new Date(post.created_at)
          .toISOString()
          .split('T')[0];
        const _post: PostSummary = { ...post, category, created_at };
        return _post;
      }),
    );
    return _posts;
  }

  async getByCategoryIds(categoryIds: number[]) {
    const posts = await this.postsRepository.find({
      select: { id: true, created_at: true, title: true, thumbnail: true },
      where: { category_id: In(categoryIds), public: 1 },
      order: { created_at: 'DESC', id: 'DESC' },
    });
    return posts;
  }
}
