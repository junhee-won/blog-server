import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    if (!createPostDto.title)
      throw new HttpException('no title', HttpStatus.BAD_REQUEST);
    if (!createPostDto.content)
      throw new HttpException('no content', HttpStatus.BAD_REQUEST);
    if (!createPostDto.public)
      throw new HttpException('no public', HttpStatus.BAD_REQUEST);
    if (!createPostDto.category_id)
      throw new HttpException('no category_id', HttpStatus.BAD_REQUEST);

    try {
      const post = this.postsRepository.create(createPostDto);
      return this.postsRepository.save(post);
    } catch (error) {
      return error;
    }
  }

  // async findOne(user_id: string): Promise<User> {
  //   return this.usersRepository.findOneBy({
  //     user_id: user_id,
  //   });
  // }
}
