import { DevicesQueryRepository } from '../../modules/devices/repositories/devices.clearQuery.repository';
import { DevicesTormRepository } from '../../modules/devices/repositories/devices.torm.repository';
import { IRootCommon } from './dto/common.interfce';
import { RootDevicesRepository } from './rootClasses/root.devices.repository';

class RootSwither {
  private _switchOnTorm = process.env.TYPE_ORM === 'on';

  private _objectCreater(provide: any, useClass: any): IRootCommon<any> {
    return { provide, useClass };
  }

  devices(): IRootCommon<typeof RootDevicesRepository> {
    return this._objectCreater(
      RootDevicesRepository,
      this._switchOnTorm ? DevicesTormRepository : DevicesQueryRepository,
    );
  }
}
export const rootInstanceSwitcher = new RootSwither();
