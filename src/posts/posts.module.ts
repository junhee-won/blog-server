import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController, PostsManageController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController, PostsManageController],
  providers: [PostsService],
})
export class PostsModule {}
