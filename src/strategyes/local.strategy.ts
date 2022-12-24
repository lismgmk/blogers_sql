import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../entity/user.entity';
import { JwtPassService } from '../modules/common-services/jwt-pass-custom/jwt-pass.service';
import { UsersService } from './../modules/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private jwtPassService: JwtPassService,
  ) {
    super({
      usernameField: 'loginOrEmail',
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
