import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { UpdatePostDto } from "./dto/update-post.dto";
import { createDateDB } from "src/module/dateConverter";

@Injectable()
export class PostsManageService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async update(updatePostDto: UpdatePostDto) {
    let _post;
    if (updatePostDto.id) {
      _post = await this.postsRepository.findOneBy({
        id: updatePostDto.id,
      });
    }
    _post = { ..._post, ...updatePostDto };
    const { action, ...post } = _post;

    if (
      !post.title ||
      !post.content ||
      !post.category_id ||
      (action === "publish" && post.public === 2)
    )
      throw new HttpException("no post", HttpStatus.BAD_REQUEST);
    try {
      const currentTime = createDateDB();
      post.updated_at = currentTime;
      if (action === "publish") {
        post.created_at = currentTime;
      }
      return await this.postsRepository.save(post);
    } catch (error) {
      throw error;
    }
  }

  async getAll(visibility: "draft" | "public" | "private") {
    let publicNumber: 0 | 1 | 2;
    if (visibility === "draft") {
      publicNumber = 2;
    } else if (visibility === "public") {
      publicNumber = 1;
    } else {
      publicNumber = 0;
    }
    const posts = await this.postsRepository.find({
      where: { public: publicNumber },
      order: { id: "DESC" },
    });
    return posts;
  }
}
