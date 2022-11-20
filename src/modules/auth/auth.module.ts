import { Device } from './../devices/device.entity';
import { BlackList } from './../black-list/black-list.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../../strategyes/jwt.strategy';
import { LocalStrategy } from '../../strategyes/local.strategy';
import { BlackListService } from '../black-list/black-list.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { DevicesService } from '../devices/devices.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { MailService } from '../common-services/mail/mail.service';
import { IsExpired } from '../../dto-validator/check-expiration-code';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlackList, Device, User]),
    PassportModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    DevicesService,
    AuthService,
    BlackListService,
    JwtPassService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    MailService,
    IsExpired,
  ],
})
export class AuthModule {}
