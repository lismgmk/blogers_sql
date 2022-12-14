import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BlackListService } from '../modules/black-list/black-list.service';
import { JwtPassService } from '../modules/common-services/jwt-pass-custom/jwt-pass.service';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(
    private blackListService: BlackListService,
    private jwtPassService: JwtPassService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const isChecked = await this.blackListService.getTokenClearQuery(
      refreshToken,
    );
    const payload = await this.jwtPassService.decodeJwt(refreshToken);
    const user = await this.usersService.getUserByIdClearQuery(payload.id);
    const verify = await this.jwtPassService.verifyJwt(refreshToken);
    if (isChecked.length > 0 || !verify || !user) {
      throw new UnauthorizedException();
    }

    request.deviceId = payload.deviceId;
    request.user = user;
    return true;
  }
}
