import { Controller, UseGuards, Body, Get, Post, Put } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CategoriesManageService } from "./categoriesManage.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("manage/category")
export class CategoriesManageController {
  constructor(
    private readonly categoriessManageService: CategoriesManageService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create() {
    return await this.categoriessManageService.create();
  }

  @UseGuards(JwtAuthGuard)
  @Get("all")
  async getAll() {
    return await this.categoriessManageService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriessManageService.update(updateCategoryDto);
  }
}
