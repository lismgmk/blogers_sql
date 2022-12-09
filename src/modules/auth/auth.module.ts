import { jwtConfigAsync } from '../../config/jwtconfig';
import { DevicesQueryRepository } from './../devices/devices.clearQuery.repository';
import { BlackList } from '../../entity/black-list.entity';
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
import { User } from '../../entity/user.entity';
import { MailService } from '../common-services/mail/mail.service';
import { IsExpired } from '../../dto-validator/check-expiration-code';
import { Device } from '../../entity/device.entity';
import { RootDevicesRepository } from '../devices/classes/root.devices.repository';
import { obj } from '../../config/proV';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlackList, Device, User]),
    PassportModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfigAsync),
  ],
  controllers: [AuthController],
  providers: [
    DevicesService,
    DevicesQueryRepository,
    AuthService,
    BlackListService,
    JwtPassService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    MailService,
    IsExpired,
    // RootDevicesRepository,
    obj,
  ],
  // exports: [RootDevicesRepository],
})
export class AuthModule {}
