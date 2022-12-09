import { Injectable } from '@nestjs/common';
import { RootDevicesRepository } from './classes/root.devices.repository';
import { DevicesTormRepository } from './devices.torm.repository';
import { ICreateDevice } from './dto/createDevice.interface';

@Injectable()
export class DevicesService {
  // module =
  //   process.env.TYPE_ORM === 'on' ? DevicesQueryRepository : DevicesRepository;

  // constructor(private devicesQueryRepository: typeof module) {}
  constructor(private devicesQueryRepository: RootDevicesRepository) {}

  async getAllDevices(userId: string) {
    return this.devicesQueryRepository.getAllDevices(userId);
  }

  async createDevice(dto: ICreateDevice) {
    return this.devicesQueryRepository.createDevice(dto);
  }

  async deleteAllExcludeCurrent(userId: string, deviceId: string) {
    return this.devicesQueryRepository.deleteAllExcludeCurrent(
      userId,
      deviceId,
    );
  }

  async changeDeviceExpiredClearQuery(dto: {
    userId: string;
    deviceId: string;
  }) {
    return this.devicesQueryRepository.changeDeviceExpiredClearQuery(dto);
  }

  async createDeviceClearQuery(dto: ICreateDevice) {
    return this.devicesQueryRepository.createDeviceClearQuery(dto);
  }

  async getUserIdByDeviceId(id: string) {
    return this.devicesQueryRepository.getUserIdByDeviceId(id);
  }

  async deleteDeviceClearQuery(id: string, userId: string) {
    return this.devicesQueryRepository.deleteDeviceClearQuery(id, userId);
  }
}
