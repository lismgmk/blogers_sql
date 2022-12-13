import { BlackListQueryRepository } from '../../modules/black-list/repositories/blackList.clearQuery.repository';
import { BlackListTormRepository } from '../../modules/black-list/repositories/blackList.torm.repository';
import { BlogsQueryRepository } from '../../modules/blogs/repositories/blogs.clearQuery.repository';
import { BlogsTormRepository } from '../../modules/blogs/repositories/blogs.torm.repository';
import { CheckIpQueryRepository } from '../../modules/check-ip-attempt/repositories/checkIp.clearQuery.repository';
import { CheckIpTormRepository } from '../../modules/check-ip-attempt/repositories/checkIp.torm.repository';
import { CommentsQueryRepository } from '../../modules/comments/repositories/comments.clearQuery.repository';
import { CommentsTormRepository } from '../../modules/comments/repositories/comments.torm.repository';
import { DevicesQueryRepository } from '../../modules/devices/repositories/devices.clearQuery.repository';
import { DevicesTormRepository } from '../../modules/devices/repositories/devices.torm.repository';
import { LikesQueryRepository } from '../../modules/likes/repositories/likes.clearQuery.repository';
import { LikesTormRepository } from '../../modules/likes/repositories/likes.torm.repository';
import { PostsQueryRepository } from '../../modules/posts/postsClearQuert.repositiry';
import { PostsTormRepository } from '../../modules/posts/repositories/posts.torm.repository';
import { TestingQueryRepository } from '../../modules/testing/repositories/testing.clearQuery.repository';
import { TestingTormRepository } from '../../modules/testing/repositories/testing.torm.repository';
import { UsersQueryRepository } from '../../modules/users/repositories/users.clearQuery.repository';
import { UsersTormRepository } from '../../modules/users/repositories/users.torm.repository';
import { IRootCommon } from './dto/common.interfce';
import { RootBlackListRepository } from './rootClasses/root.blackList.repository';
import { RootBlogsRepository } from './rootClasses/root.blogs.repository';
import { RootCheckIpRepository } from './rootClasses/root.checkIp.repository';
import { RootCommentsRepository } from './rootClasses/root.comments.repository';
import { RootDevicesRepository } from './rootClasses/root.devices.repository';
import { RootLikesRepository } from './rootClasses/root.likes.repository';
import { RootPostsRepository } from './rootClasses/root.posts.repository';
import { RootTestingRepository } from './rootClasses/root.testing.repository';
import { RootUsersRepository } from './rootClasses/root.users.repository';

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
