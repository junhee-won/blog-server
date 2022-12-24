import { Injectable, Inject, forwardRef } from '@nestjs/common';
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
    const result = [];
    const parentCategories = await this.categoriesRepository.findBy({
      public: 1,
      parent_category_id: 0,
    });
    parentCategories.sort(this.sortCategory);
    await Promise.all(
      parentCategories.map(async (parentCategory) => {
        const item = {
          id: parentCategory.id,
          name: parentCategory.name,
          children: [],
        };
        const childrenCategories = await this.categoriesRepository.findBy({
          public: 1,
          parent_category_id: parentCategory.id,
        });
        childrenCategories.sort(this.sortCategory);
        childrenCategories.map((childrenCategory) => {
          item.children.push({
            id: childrenCategory.id,
            name: childrenCategory.name,
          });
        });
        result.push(item);
      }),
    );
    return result;
  }

  async getById(id: number) {
    const category = await this.categoriesRepository.findOneBy({
      id: id,
    });
    if (category.parent_category_id === 0) return category.name;
    else {
      const parentCategory = await this.categoriesRepository.findOneBy({
        id: category.parent_category_id,
      });
      return `${parentCategory.name} / ${category.name}`;
    }
  }

  async getPosts(id: number) {
    const posts = await this.postsService.getByCategoryid(id);
    const childrenCategories = await this.categoriesRepository.findBy({
      parent_category_id: id,
    });
    await Promise.all(
      childrenCategories.map(async (childCategory) => {
        const childPosts = await this.postsService.getByCategoryid(
          childCategory.id,
        );
        childPosts.map((childPosts) => posts.push(childPosts));
      }),
    );
    posts.sort(function (a, b) {
      return a.created_at.localeCompare(b.created_at);
    });

    return posts.map((post) => {
      const created_at: string = new Date(post.created_at)
        .toISOString()
        .split('T')[0];
      return {
        id: post.id,
        title: post.title,
        created_at,
      };
    });
  }

  sortCategory(a: Category, b: Category) {
    return a.priority - b.priority;
  }
}
