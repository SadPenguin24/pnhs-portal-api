import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getCookie, setCookie } from 'cookies-next';
import { jwtConstants } from './constants';

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
    } else {
      throw new NotAcceptableException('Email or password is wrong');
    }
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user._id,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret_refresh,
      expiresIn: '30m',
    });
    const fUser = await this.usersService.getUserById(user._id);
    return {
      user: fUser,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
  async refresh(refresh_token: any) {
    const refresh_secret = jwtConstants.secret_refresh;
    const verified_rt = this.jwtService.verify(refresh_token, {
      secret: refresh_secret,
    });

    try {
      if (verified_rt) {
        const payload = {
          username: verified_rt.email,
          sub: verified_rt._id,
          role: verified_rt.role,
        };
        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, {
          secret: jwtConstants.secret_refresh,
          expiresIn: '30m',
        });
        return { access_token: access_token, refresh_token: refresh_token };
      }
    } catch (err) {
      return `error: ${err}`;
    }
  }
}
