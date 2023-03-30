import {
  Controller,
  UseGuards,
  Body,
  Get,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PostsManageService } from "./postsManage.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller("manage/post")
export class PostsManageController {
  constructor(private readonly postsManageService: PostsManageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsManageService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("all")
  async getAll(
    @Query("visibility") visibility: "draft" | "public" | "private",
  ) {
    return await this.postsManageService.getAll(visibility);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() updatePostDto: UpdatePostDto) {
    return await this.postsManageService.update(updatePostDto);
  }
}
