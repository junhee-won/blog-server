import {
  Controller,
  UseGuards,
  Body,
  Param,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('all')
  async getAll() {
    return await this.categoriesService.getAll();
  }
}
