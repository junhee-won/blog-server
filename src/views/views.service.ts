import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { View } from './view.entity';
import { AddViewDto } from './dto/add-view.dto';

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(View)
    private viewsRepository: Repository<View>,
  ) {}

  async create(addViewDto: AddViewDto) {
    console.log(addViewDto);
    // if (!createPostDto.title)
    //   throw new HttpException('no title', HttpStatus.BAD_REQUEST);
    // if (!createPostDto.content)
    //   throw new HttpException('no content', HttpStatus.BAD_REQUEST);
    // if (createPostDto.public !== 0 && createPostDto.public !== 1)
    //   throw new HttpException('no public', HttpStatus.BAD_REQUEST);
    // if (!createPostDto.category_id)
    //   throw new HttpException('no category_id', HttpStatus.BAD_REQUEST);
    // try {
    //   const post = this.postsRepository.create(createPostDto);
    //   return await this.postsRepository.save(post);
    // } catch (error) {
    //   throw error;
    // }
  }
}
