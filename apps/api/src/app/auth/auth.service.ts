import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { setCookie } from 'cookies-next';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user._id,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);
    const fUser = await this.usersService.getUserById(user._id);

    return {
      user: fUser,
      access_token: access_token,
    };
  }
}
