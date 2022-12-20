import { BlackListService } from './../black-list/black-list.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';
import { Device } from '../../entity/device.entity';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { UsersService } from '../users/users.service';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    BlackListService,
    UsersService,
    JwtPassService,
    JwtService,
    rootInstanceSwitcher.blackList(),
    rootInstanceSwitcher.users(),
    rootInstanceSwitcher.devices(),
  ],
})
export class DevicesModule {}
