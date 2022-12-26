import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesManageService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto.name)
      throw new HttpException('no name', HttpStatus.BAD_REQUEST);
    try {
      const cateogry = this.categoriesRepository.create(createCategoryDto);
      return await this.categoriesRepository.save(cateogry);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return await this.categoriesRepository.find();
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({
      id: updateCategoryDto.id,
    });
    const _category = { ...category, ...updateCategoryDto };

    if (!_category.name || (_category.public !== 0 && _category.public !== 1))
      throw new HttpException('bad category', HttpStatus.BAD_REQUEST);

    try {
      return await this.categoriesRepository.save(_category);
    } catch (error) {
      throw error;
    }
  }
}
