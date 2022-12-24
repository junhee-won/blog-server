import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
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

  sortCategory(a: Category, b: Category) {
    return a.priority - b.priority;
  }
}
