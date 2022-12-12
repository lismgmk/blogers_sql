import { Injectable } from '@nestjs/common';
import { ICreateDevice } from '../../../modules/devices/dto/createDevice.interface';

@Injectable()
export class RootDevicesRepository {
  constructor() {}
  getAllDevices(userId: string): void {
    return;
  }
  createDevice(dto: ICreateDevice): void {
    return;
  }
  deleteAllExcludeCurrent(userId: string, deviceId: string): void {
    return;
  }
  createDeviceClearQuery(dto: ICreateDevice): void {
    return;
  }
  getUserIdByDeviceId(id: string): void {
    return;
  }
  deleteDeviceClearQuery(id: string, userId: string): void {
    return;
  }

  changeDeviceExpiredClearQuery(dto: { userId: string; deviceId: string }) {
    return;
  }
}
