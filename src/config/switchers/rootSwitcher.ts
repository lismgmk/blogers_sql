import { BlackListQueryRepository } from '../../modules/black-list/repositories/blackList.clearQuery.repository';
import { BlackListTormRepository } from '../../modules/black-list/repositories/blackList.torm.repository';
import { DevicesQueryRepository } from '../../modules/devices/repositories/devices.clearQuery.repository';
import { DevicesTormRepository } from '../../modules/devices/repositories/devices.torm.repository';
import { IRootCommon } from './dto/common.interfce';
import { RootBlackListRepository } from './rootClasses/root.blackList.repository';
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
  blackList(): IRootCommon<typeof RootBlackListRepository> {
    return this._objectCreater(
      RootBlackListRepository,
      this._switchOnTorm ? BlackListTormRepository : BlackListQueryRepository,
    );
  }

  blogs(): IRootCommon<typeof RootBlogsRepository> {
    return this._objectCreater(
      RootBlogsRepository,
      this._switchOnTorm ? BlogsTormRepository : BlogsQueryRepository,
    );
  }

  checkIp(): IRootCommon<typeof RootCheckIpRepository> {
    return this._objectCreater(
      RootCheckIpRepository,
      this._switchOnTorm ? CheckIpTormRepository : CheckIpQueryRepository,
    );
  }

  comments(): IRootCommon<typeof RootCommentsRepository> {
    return this._objectCreater(
      RootCommentsRepository,
      this._switchOnTorm ? CommentsTormRepository : CommentsQueryRepository,
    );
  }

  likes(): IRootCommon<typeof RootLikesRepository> {
    return this._objectCreater(
      RootLikesRepository,
      this._switchOnTorm ? LikesTormRepository : LikesQueryRepository,
    );
  }

  posts(): IRootCommon<typeof RootPostsRepository> {
    return this._objectCreater(
      RootPostsRepository,
      this._switchOnTorm ? PostsTormRepository : PostsQueryRepository,
    );
  }

  testing(): IRootCommon<typeof RootTestingRepository> {
    return this._objectCreater(
      RootTestingRepository,
      this._switchOnTorm ? TestingTormRepository : TestingQueryRepository,
    );
  }

  users(): IRootCommon<typeof RootUsersRepository> {
    return this._objectCreater(
      RootUsersRepository,
      this._switchOnTorm ? UsersTormRepository : UsersQueryRepository,
    );
  }
}
export const rootInstanceSwitcher = new RootSwither();
