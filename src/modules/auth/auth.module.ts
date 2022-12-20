import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfigAsync } from '../../config/jwtconfig';
import { IsExpired } from '../../dto-validator/check-expiration-code';
import { BlackList } from '../../entity/black-list.entity';
import { Device } from '../../entity/device.entity';
import { User } from '../../entity/user.entity';
import { JwtStrategy } from '../../strategyes/jwt.strategy';
import { LocalStrategy } from '../../strategyes/local.strategy';
import { BlackListService } from '../black-list/black-list.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { MailService } from '../common-services/mail/mail.service';
import { DevicesService } from '../devices/devices.service';
import { UsersService } from '../users/users.service';
import { rootInstanceSwitcher } from './../../config/switchers/rootSwitcher';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
    AuthService,
    BlackListService,
    rootInstanceSwitcher.blackList(),
    rootInstanceSwitcher.devices(),
    rootInstanceSwitcher.users(),
    JwtPassService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    MailService,
    IsExpired,
  ],
})
export class AuthModule {}
