import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { compareDesc } from 'date-fns';
import { DataSource } from 'typeorm';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { MailService } from '../common-services/mail/mail.service';
import { User } from '../../entity/user.entity';
import { UsersService } from '../users/users.service';
import {
  IRegistrationConfirmationResponse,
  IRegistrationDto,
} from './dto/auth-interfaces.dto';
import { GetNewPasswordDto } from './dto/get-new-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtPassService: JwtPassService,
    private configService: ConfigService,
    private mailService: MailService,
    private usersService: UsersService,
    @InjectDataSource() protected dataSource: DataSource,
  ) {}
  async getRefreshAccessToken(userId: string, deviceId: string) {
    const expiredAccess = this.configService.get<string>('EXPIRED_ACCESS');
    const expiredRefresh = this.configService.get<string>('EXPIRED_REFRESH');

    const accessToken = await this.jwtPassService.createJwtAccess(
      userId,
      expiredAccess,
    );
    const refreshToken = await this.jwtPassService.createJwtRefresh(
      userId,
      expiredRefresh,
      deviceId,
    );
    return { accessToken, refreshToken };
  }

  async registration(dto: IRegistrationDto) {
    const confirmationCode = new Date().toISOString();
    const newUserDto = {
      login: dto.login,
      email: dto.email,
      password: dto.password,
      userIp: dto.userIp,
      confirmationCode,
      isConfirmed: false,
    };
    await this.mailService.sendUserConfirmation(
      { email: dto.email, name: dto.login },
      confirmationCode,
    );
    await this.usersService.createUserClearQuery(newUserDto);
  }

  async resendingEmail(email: string) {
    const currentUser = await this.usersService.getUserByEmailClearQuery(email);
    if (!currentUser) {
      throw new UnauthorizedException();
    }
    const confirmationCode = new Date().toISOString();
    await this.mailService.sendUserConfirmation(
      { email, name: currentUser.name },
      confirmationCode,
    );
    await this.usersService.changeUserConfirmCodeClearQuery({
      id: currentUser.id,
      confirmationCode,
    });
    return;
  }

  async passwordRecovery(email: string) {
    const currentUser = await this.usersService.getUserByEmailClearQuery(email);
    if (currentUser) {
      const confirmationCode = new Date().toISOString();
      await this.mailService.sendUserConfirmation(
        { email, name: currentUser.name },
        confirmationCode,
      );
      await this.usersService.changeUserStatusConfirmCodeClearQuery({
        id: currentUser.id,
        confirmationCode,
        isConfirmed: false,
      });
    }

    return;
  }

  async getNewPassword(dto: GetNewPasswordDto) {
    const currentUser =
      (await this.usersService.getUserByConfirmationCodeClearQuery(
        dto.recoveryCode,
      )) as User;
    if (!currentUser) {
      throw new UnauthorizedException();
    }

    if (
      compareDesc(
        new Date(currentUser.confirmationCode),
        new Date(dto.recoveryCode),
      ) !== 0
    ) {
      throw new UnauthorizedException();
    }
    const hashPassword = await this.jwtPassService.createPassBcrypt(
      dto.newPassword,
    );
    await this.usersService.changeAdmitStateClearQuery({
      id: currentUser.id,
      isConfirmed: true,
      passwordHash: hashPassword,
    });
    return;
  }

  async registrationConfirmation(code: Date) {
    const currentUser =
      (await this.usersService.getUserByConfirmationCodeClearQuery(
        code,
      )) as User;
    if (!currentUser) {
      throw new UnauthorizedException();
    }
    await this.usersService.changeConfirmClearQuery({
      id: currentUser.id,
      isConfirmed: true,
    });

    return {
      id: currentUser.id.toString(),
      login: currentUser.name,
      email: currentUser.email,
      createdAt: currentUser.createdAt,
    } as IRegistrationConfirmationResponse;
  }
}
