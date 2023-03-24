import { Controller, Body, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ViewsService } from "./views.service";
import { AddViewDto } from "./dto/add-view.dto";

@Controller("view")
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  async add(@Body() AddViewDto: AddViewDto) {
    return await this.viewsService.add(AddViewDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getLast7Days() {
    return await this.viewsService.getLast7Days();
  }
}
