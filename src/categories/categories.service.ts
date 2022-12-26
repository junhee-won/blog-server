import {
  Injectable,
  Inject,
  forwardRef,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,

    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  async getAll() {
    const parentCategories = await this.categoriesRepository.find({
      select: { id: true, name: true },
      where: { public: 1, parent_category_id: 0 },
      order: { priority: 'ASC' },
    });

    return await Promise.all(
      parentCategories.map(async (parentCategory) => {
        const item = { ...parentCategory, children: [] };
        item.children = await this.categoriesRepository.find({
          select: { id: true, name: true },
          where: { public: 1, parent_category_id: parentCategory.id },
          order: { priority: 'ASC' },
        });
        return item;
      }),
    );
  }

  async getById(id: number) {
    const category = await this.categoriesRepository.findOne({
      select: { name: true, parent_category_id: true },
      where: { id: id },
    });
    if (!category || category?.public === 0)
      throw new HttpException('no category', HttpStatus.NOT_FOUND);

    if (category.parent_category_id === 0) return category.name;
    else {
      const parentCategory = await this.categoriesRepository.findOne({
        select: { name: true },
        where: { id: category.parent_category_id },
      });
      return `${parentCategory.name} / ${category.name}`;
    }
  }

  async getPosts(id: number) {
    const childrenCategories = await this.categoriesRepository.findBy({
      parent_category_id: id,
    });

    const categoriesId: number[] = [Number(id)];
    childrenCategories.forEach((childCategory) => {
      categoriesId.push(childCategory.id);
    });

    const posts = await this.postsService.getByCategoryIds(categoriesId);

    return posts.map((post) => {
      const created_at: string = new Date(post.created_at)
        .toISOString()
        .split('T')[0];
      return { ...post, created_at };
    });
  }
}
