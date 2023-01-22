import { Controller, Get, Param } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller("category")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get("all")
  async getAll() {
    return await this.categoriesService.getAll();
  }

  @Get(":id")
  async getPosts(@Param("id") id: number) {
    const category = await this.categoriesService.getById(id);
    const posts = await this.categoriesService.getPosts(id);
    return { category, posts };
  }
}
