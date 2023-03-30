import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Post } from "./post.entity";
import { CategoriesService } from "src/categories/categories.service";
import { PostSummary } from "./post.interface";
import { PostPage } from "./post.interface";
import { convertDateDBToClient } from "src/module/dateConverter";
import { Category } from "src/categories/category.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
  ) {}

  async getById(id: number) {
    const post = await this.postsRepository.findOne({
      select: {
        created_at: true,
        title: true,
        content: true,
        category_id: true,
        thumbnail: true,
      },
      where: {
        id: id,
        public: 1,
      },
    });
    if (!post) throw new HttpException("no post", HttpStatus.NOT_FOUND);

    const category = await this.categoriesService.getById(post.category_id);
    const created_at = convertDateDBToClient(post.created_at);
    const postPage: PostPage = { ...post, created_at, category };
    return postPage;
  }

  async getNew() {
    const posts = await this.postsRepository.find({
      select: {
        id: true,
        created_at: true,
        title: true,
        thumbnail: true,
        category_id: true,
      },
      where: { public: 1 },
      order: { created_at: "DESC", id: "DESC" },
    });

    const _posts = await Promise.all(
      posts.map(async (post) => {
        const categoryTree: Category[] =
          await this.categoriesService.getTreeById(post.category_id);
        const created_at: string = convertDateDBToClient(post.created_at);
        const _post: PostSummary = { ...post, categoryTree, created_at };
        return _post;
      }),
    );
    return _posts;
  }

  async getAll() {
    const posts = await this.postsRepository.find({
      select: {
        id: true,
        updated_at: true,
      },
      where: { public: 1 },
      order: { id: "DESC" },
    });
    return posts;
  }

  async getByCategoryIds(categoryIds: number[]) {
    const posts = await this.postsRepository.find({
      select: { id: true, created_at: true, title: true, thumbnail: true },
      where: { category_id: In(categoryIds), public: 1 },
      order: { created_at: "DESC", id: "DESC" },
    });
    return posts;
  }
}
