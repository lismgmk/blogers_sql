import { UsersService } from './../modules/users/users.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPassService } from '../modules/common-services/jwt-pass-custom/jwt-pass.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../modules/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private jwtPassService: JwtPassService,
    private configService: ConfigService,
  ) {
    super({
      usernameField: 'login',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = (await this.usersService.getUserByNameClearQuery(
      username,
    )) as User;
    let isMatchPass;

    if (user) {
      isMatchPass = await this.jwtPassService.checkPassBcrypt(
        password,
        user.passwordHash,
      );
    }

    if (!user || !isMatchPass) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
