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
    const categories = await this.categoriesRepository.findBy({
      public: 1,
    });
    return categories;
  }

  async getById(id: number) {
    const category = await this.categoriesRepository.findOneBy({
      id: id,
    });
    return category.name;
  }
}
