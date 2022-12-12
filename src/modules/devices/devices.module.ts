import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';
import { Device } from '../../entity/device.entity';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { UsersService } from '../users/users.service';
import { BlackListService } from './../black-list/black-list.service';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { DevicesQueryRepository } from './repositories/devices.clearQuery.repository';
import { DevicesTormRepository } from './repositories/devices.torm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    UsersService,
    JwtPassService,
    rootInstanceSwitcher.blackList(),
    JwtService,
    DevicesQueryRepository,
    DevicesTormRepository,
    rootInstanceSwitcher.devices(),
  ],
})
export class DevicesModule {}
