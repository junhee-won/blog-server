import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { CategoriesModule } from "./categories/categories.module";
import { ViewsModule } from "./views/views.module";
import { AppController } from "./app.controller";
import { User } from "./users/user.entity";
import { Post } from "./posts/post.entity";
import { Category } from "./categories/category.entity";
import { View } from "./views/view.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite3",
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
