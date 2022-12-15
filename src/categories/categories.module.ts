import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesManageController } from './categoriesManage.controller';
import { CategoriesService } from './categories.service';
import { CategoriesManageService } from './categoriesManage.service';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController, CategoriesManageController],
  providers: [CategoriesService, CategoriesManageService],
})
export class CategoriesModule {}
