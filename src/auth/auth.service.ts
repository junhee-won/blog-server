import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface PropsLogin {
  user_id: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user_id: string, _password: string): Promise<any> {
    const user = await this.usersService.findOne(user_id);
    if (!user) return null;
    const isMatch: boolean = await bcrypt.compare(_password, user.password);
    if (!isMatch) return null;
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { user_id: user.user_id, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
