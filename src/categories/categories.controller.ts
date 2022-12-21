import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('all')
  async getAll() {
    return await this.categoriesService.getAll();
  }
}
