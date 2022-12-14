import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { ViewsModule } from './views/views.module';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Category } from './categories/category.entity';
import { View } from './views/view.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [User, Post, Category, View],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CategoriesModule,
    ViewsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
