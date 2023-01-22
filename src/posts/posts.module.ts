import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsController } from "./posts.controller";
import { PostsManageController } from "./postsManage.controller";
import { PostsService } from "./posts.service";
import { PostsManageService } from "./postsManage.service";
import { Post } from "./post.entity";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoriesModule],
  controllers: [PostsController, PostsManageController],
  providers: [PostsService, PostsManageService],
  exports: [PostsService],
})
export class PostsModule {}
