import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { createDateDB } from "src/module/dateConverter";

@Injectable()
export class PostsManageService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    if (!createPostDto.title)
      throw new HttpException("no title", HttpStatus.BAD_REQUEST);
    if (!createPostDto.content)
      throw new HttpException("no content", HttpStatus.BAD_REQUEST);
    if (
      createPostDto.public !== 0 &&
      createPostDto.public !== 1 &&
      createPostDto.public !== 2
    )
      throw new HttpException("no visbility", HttpStatus.BAD_REQUEST);
    if (!createPostDto.category_id)
      throw new HttpException("no category_id", HttpStatus.BAD_REQUEST);

    try {
      const currentTime = createDateDB();
      const post = this.postsRepository.create({
        ...createPostDto,
        created_at: currentTime,
        updated_at: currentTime,
      });
      return await this.postsRepository.insert(post);
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

  async update(updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id: updatePostDto.id });
    const _post = { ...post, ...updatePostDto };

    if (
      !_post.title ||
      !_post.content ||
      (_post.public !== 0 && _post.public !== 1 && _post.public !== 2) ||
      !_post.category_id
    )
      throw new HttpException("no post", HttpStatus.BAD_REQUEST);

    try {
      const currentTime = createDateDB();
      if (_post.public === 1) {
        _post.created_at = currentTime;
        _post.updated_at = currentTime;
      } else {
        _post.updated_at = currentTime;
      }
      return await this.postsRepository.save(_post);
    } catch (error) {
      throw error;
    }
  }
}
