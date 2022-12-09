import { RootDevicesRepository } from '../modules/devices/classes/root.devices.repository';
import { DevicesQueryRepository } from '../modules/devices/devices.clearQuery.repository';
import { DevicesTormRepository } from '../modules/devices/devices.torm.repository';

export const obj: any = {
  provide: RootDevicesRepository,
  useClass:
    process.env.TYPE_ORM === 'on'
      ? DevicesTormRepository
      : DevicesQueryRepository,
};
