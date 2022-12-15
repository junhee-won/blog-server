import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsManageController } from './postsManage.controller';
import { PostsService } from './posts.service';
import { PostsManageService } from './postsManage.service';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController, PostsManageController],
  providers: [PostsService, PostsManageService],
})
export class PostsModule {}
