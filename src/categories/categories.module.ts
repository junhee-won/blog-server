import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesManageController } from './categoriesManage.controller';
import { CategoriesService } from './categories.service';
import { CategoriesManageService } from './categoriesManage.service';
import { Category } from './category.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => PostsModule),
  ],
  controllers: [CategoriesController, CategoriesManageController],
  providers: [CategoriesService, CategoriesManageService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
