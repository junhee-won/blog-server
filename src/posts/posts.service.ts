import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async getById(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });
    if (!post || post?.public === 0)
      throw new HttpException('no post', HttpStatus.BAD_REQUEST);
    return post;
  }

  async getNew() {
    const posts = await this.postsRepository.findBy({
      public: 1,
    });
    posts.splice(5);
    return posts;
  }

  async create(createPostDto: CreatePostDto) {
    if (!createPostDto.title)
      throw new HttpException('no title', HttpStatus.BAD_REQUEST);
    if (!createPostDto.content)
      throw new HttpException('no content', HttpStatus.BAD_REQUEST);
    if (createPostDto.public !== 0 && createPostDto.public !== 1)
      throw new HttpException('no public', HttpStatus.BAD_REQUEST);
    if (!createPostDto.category_id)
      throw new HttpException('no category_id', HttpStatus.BAD_REQUEST);

    try {
      const post = this.postsRepository.create(createPostDto);
      return await this.postsRepository.save(post);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return await this.postsRepository.find();
  }

  async update(updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id: updatePostDto.id });
    const _post = { ...post, ...updatePostDto };

    if (
      !_post.title ||
      !_post.content ||
      (_post.public !== 0 && _post.public !== 1) ||
      !_post.category_id
    )
      throw new HttpException('no post', HttpStatus.BAD_REQUEST);

    try {
      return await this.postsRepository.save(_post);
    } catch (error) {
      throw error;
    }
  }
}
