import { Get, Controller, Request, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get("/")
  healthCheck() {
    return "health check";
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
