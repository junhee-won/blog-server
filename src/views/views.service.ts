import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { View } from "./view.entity";
import { AddViewDto } from "./dto/add-view.dto";

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(View)
    private viewsRepository: Repository<View>,
  ) {}

  async add(addViewDto: AddViewDto) {
    if (!addViewDto.post_id || !addViewDto.localeDateString)
      throw new HttpException("bad request", HttpStatus.BAD_REQUEST);

    const view = await this.viewsRepository.findOne({
      where: {
        post_id: addViewDto.post_id,
        localeDateString: addViewDto.localeDateString,
      },
    });

    try {
      if (!view) {
        return await this.viewsRepository.save({ ...addViewDto, count: 1 });
      } else {
        return await this.viewsRepository.save({
          ...view,
          count: view.count + 1,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getLast7Days() {
    const oneDay = 60 * 60 * 24 * 1000;
    const today = new Date();
    const last7Days = [];
    const result = [];
    for (let i = 0; i < 7; i++) {
      const lds = new Date(today.getTime() - i * oneDay).toLocaleDateString();
      last7Days.push(lds);
      result.push({
        localeDateString: lds,
        count: 0,
      });
    }
    const views = await this.viewsRepository.find({
      select: {
        count: true,
        localeDateString: true,
      },
      where: {
        localeDateString: In(last7Days),
      },
    });
    views.forEach((view) => {
      const temp = result.find(
        (ele) => ele.localeDateString === view.localeDateString,
      );
      temp.count += 1;
    });
    return result;
  }
}
