import {
  Injectable,
  Inject,
  forwardRef,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { PostsService } from "src/posts/posts.service";
import { convertDateDBToClient } from "src/module/dateConverter";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,

    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  async getAll() {
    const parentCategories = await this.categoriesRepository.find({
      select: { id: true, name: true },
      where: { public: 1, parent_category_id: 0 },
      order: { priority: "ASC" },
    });

    return await Promise.all(
      parentCategories.map(async (parentCategory) => {
        const item = { ...parentCategory, children: [] };
        item.children = await this.categoriesRepository.find({
          select: { id: true, name: true },
          where: { public: 1, parent_category_id: parentCategory.id },
          order: { priority: "ASC" },
        });
        return item;
      }),
    );
  }

  async getAllForSitemap() {
    const categories = await this.categoriesRepository.find({
      select: {
        id: true,
        updated_at: true,
      },
      where: { public: 1 },
      order: { id: "DESC" },
    });
    return categories;
  }

  async getTreeById(id: number) {
    const category = await this.categoriesRepository.findOne({
      select: { name: true, parent_category_id: true, id: true },
      where: { id: id, public: 1 },
    });
    if (!category) throw new HttpException("no category", HttpStatus.NOT_FOUND);

    if (category.parent_category_id === 0) return [category];
    else {
      const parentCategory = await this.categoriesRepository.findOne({
        select: { name: true, id: true },
        where: { id: category.parent_category_id },
      });
      return [parentCategory, category];
    }
  }

  async getById(id: number) {
    const category = await this.categoriesRepository.findOne({
      select: { name: true, parent_category_id: true },
      where: { id: id, public: 1 },
    });
    if (!category) throw new HttpException("no category", HttpStatus.NOT_FOUND);

    if (category.parent_category_id === 0) return category.name;
    else {
      const parentCategory = await this.categoriesRepository.findOne({
        select: { name: true },
        where: { id: category.parent_category_id },
      });
      return `${parentCategory.name} / ${category.name}`;
    }
  }

  async getPosts(id: number) {
    const categoriesId: number[] = [Number(id)];

    const childrenCategories = await this.categoriesRepository.findBy({
      parent_category_id: id,
    });
    childrenCategories.forEach((childCategory) => {
      categoriesId.push(childCategory.id);
    });

    const posts = await this.postsService.getByCategoryIds(categoriesId);

    return posts.map((post) => {
      const created_at: string = convertDateDBToClient(post.created_at);
      return { ...post, created_at };
    });
  }
}
