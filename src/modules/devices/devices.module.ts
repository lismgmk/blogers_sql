import { RootDevicesRepository } from './classes/root.devices.repository';
import { BlackListService } from './../black-list/black-list.service';
import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { UsersService } from '../users/users.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { JwtService } from '@nestjs/jwt';
import { DevicesQueryRepository } from './devices.clearQuery.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../../entity/device.entity';
import { DevicesTormRepository } from './devices.torm.repository';
import { obj } from '../../config/proV';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    UsersService,
    JwtPassService,
    BlackListService,
    JwtService,
    DevicesQueryRepository,
    DevicesTormRepository,
    obj,
    // {
    //   provide: RootDevicesRepository,
    //   useClass:
    //     process.env.TYPE_ORM === 'on'
    //       ? DevicesTormRepository
    //       : DevicesQueryRepository,
    // },
  ],
  exports: [RootDevicesRepository],
})
export class DevicesModule {}
