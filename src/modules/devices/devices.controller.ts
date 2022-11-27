import { DevicesService } from './devices.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetDeviceId } from '../../decorators/get-device-id.decorator';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { CookieGuard } from '../../guards/cookie.guard';

@Controller('security/devices')
export class DevicesController {
  constructor(private readonly deviceService: DevicesService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(CookieGuard)
  async getAllDevices(
    @GetUserId()
    userId: string,
  ) {
    return this.deviceService.getAllDevices(userId);
  }

  @Delete()
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(CookieGuard)
  async deleteAllExcludeCurrent(
    @GetUserId()
    userId: string,
    @GetDeviceId()
    deviceId: string,
  ) {
    return await this.deviceService.deleteAllExcludeCurrent(userId, deviceId);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(CookieGuard)
  async deleteCurrentDevice(
    @Param('id', ParseUUIDPipe)
    deviceId: string,
    @GetUserId()
    userId: string,
  ) {
    return await this.deviceService.deleteDeviceClearQuery(deviceId, userId);
  }
}
