import { Injectable } from '@nestjs/common';
import { ICreateDevice } from '../dto/createDevice.interface';

@Injectable()
export class RootDevicesRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAllDevices(userId: string): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createDevice(dto: ICreateDevice): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteAllExcludeCurrent(userId: string, deviceId: string): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createDeviceClearQuery(dto: ICreateDevice): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getUserIdByDeviceId(id: string): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteDeviceClearQuery(id: string, userId: string): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeDeviceExpiredClearQuery(dto: { userId: string; deviceId: string }) {}
}
