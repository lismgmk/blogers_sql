import { BlackListService } from './../black-list/black-list.service';
import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { UsersService } from '../users/users.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { JwtService } from '@nestjs/jwt';
import { DevicesQueryRepository } from './devices.clearQuery.repository';
import { Device } from './device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
})
export class DevicesModule {}
