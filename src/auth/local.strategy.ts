import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'user_id',
    });
  }

  async validate(user_id: string, password: string): Promise<any> {
    const saltOrRounds: number = 10;
    const hash: string = await bcrypt.hash(password, saltOrRounds);
    const isMatch: boolean = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('wrong password');
    }
    const user = await this.authService.validateUser(user_id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
