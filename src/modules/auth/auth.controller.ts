import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Post,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

import { Response } from 'express';
import { DeviceName } from '../../decorators/device-name.decorator';
import { GetDeviceId } from '../../decorators/get-device-id.decorator';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { GetUser } from '../../decorators/get-user.decorator';
import { PuerRefresgToken } from '../../decorators/puer-refresh-token.decorator';
import { UserIp } from '../../decorators/user-ip.decorator';
import { CommonErrorFilter } from '../../exceptions/common-error-filter';
import { ValidationBodyExceptionFilter } from '../../exceptions/validation-body-exception-filter';
import { CookieGuard } from '../../guards/cookie.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LocalStrategyGuard } from '../../guards/local-strategy.guard';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { BlackListService } from '../black-list/black-list.service';
import { DevicesService } from '../devices/devices.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../../entity/user.entity';
import { AuthService } from './auth.service';
import { GetNewPasswordDto } from './dto/get-new-password.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResendingEmailDto } from './dto/resending-email.dto';
import { uuid } from 'uuidv4';
import { CodeAuthDto } from './dto/code-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly devicesService: DevicesService,
    private readonly blackListService: BlackListService,
  ) {}

  @HttpCode(204)
  @Post('/registration')
  @UseFilters(new ValidationBodyExceptionFilter())
  @UseFilters(new CommonErrorFilter())
  async createUser(
    @Ip() userIp: string,
    @Body(new CustomValidationPipe()) createUser: CreateUserDto,
  ) {
    return this.authService.registration({ ...createUser, userIp });
  }
  @HttpCode(200)
  @Post('/refresh-token')
  @UseFilters(new ValidationBodyExceptionFilter())
  @UseFilters(new CommonErrorFilter())
  @UseGuards(CookieGuard)
  async getRefreshAccessToken(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @GetDeviceId()
    deviceId: string,
    @PuerRefresgToken()
    refreshToken: string,
  ) {
    await this.blackListService.addTokenClearQuery(refreshToken);
    const tokens = await this.authService.getRefreshAccessToken(
      user.id.toString(),
      deviceId,
    );

    await this.devicesService.changeDeviceExpiredClearQuery({
      userId: user.id.toString(),
      deviceId: deviceId.toString(),
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken: tokens.accessToken };
  }

  @HttpCode(200)
  @Post('/login')
  @UseFilters(new ValidationBodyExceptionFilter())
  @UseFilters(new CommonErrorFilter())
  @UseGuards(LocalStrategyGuard)
  async login(
    @GetUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
    @Body(new CustomValidationPipe()) loginAuthDto: LoginAuthDto,
    @UserIp() userIp: string,
    @DeviceName() deviceName: string,
  ) {
    const deviceId = uuid();
    const tokens = await this.authService.getRefreshAccessToken(
      userId,
      deviceId,
    );

    await this.devicesService.createDevice({
      id: deviceId,
      ip: userIp,
      userId,
      deviceName,
      deviceId: deviceId,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken: tokens.accessToken };
  }

  @HttpCode(204)
  @Post('/registration-email-resending')
  @UseFilters(new ValidationBodyExceptionFilter())
  @UseFilters(new CommonErrorFilter())
  async registrationEmailResending(
    @Res({ passthrough: true }) res: Response,
    @Body(new CustomValidationPipe()) resendingEmail: ResendingEmailDto,
  ) {
    return this.authService.resendingEmail(resendingEmail.email);
  }

  @HttpCode(204)
  @Post('/password-recovery')
  @UseFilters(new ValidationBodyExceptionFilter())
  @UseFilters(new CommonErrorFilter())
  async passwordRecovery(
    @Body(new CustomValidationPipe()) resendingEmail: ResendingEmailDto,
  ) {
    return this.authService.passwordRecovery(resendingEmail.email);
  }

  @HttpCode(204)
  @Post('/new-password')
  @UseFilters(new ValidationBodyExceptionFilter())
  @UseFilters(new CommonErrorFilter())
  async getNewPassword(
    @Body(new CustomValidationPipe()) getNewPassword: GetNewPasswordDto,
  ) {
    return this.authService.getNewPassword(getNewPassword);
  }

  @HttpCode(204)
  @Post('/registration-confirmation')
  @UseFilters(new CommonErrorFilter())
  async registrationConfirmation(
    @Body(new CustomValidationPipe()) code: CodeAuthDto,
  ) {
    return this.authService.registrationConfirmation(code.code);
  }

  @HttpCode(204)
  @Post('/logout')
  @SkipThrottle()
  @UseFilters(new CommonErrorFilter())
  @UseGuards(CookieGuard)
  async logout(
    @GetUser() user: User,
    @GetDeviceId()
    deviceId: string,
    @PuerRefresgToken()
    refreshToken: string,
  ) {
    await this.devicesService.deleteAllExcludeCurrent(deviceId, user.id);
    await this.blackListService.addTokenClearQuery(refreshToken);
    return;
  }

  @HttpCode(200)
  @Get('/me')
  @SkipThrottle()
  @UseFilters(new CommonErrorFilter())
  @UseGuards(JwtAuthGuard)
  async me(@GetUser() user: User) {
    return {
      email: user.email,
      login: user.name,
      userId: user.id,
    };
  }
}
