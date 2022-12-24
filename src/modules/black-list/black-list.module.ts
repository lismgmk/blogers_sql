import { Module } from '@nestjs/common';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';
import { BlackListService } from './black-list.service';

@Module({
  providers: [rootInstanceSwitcher.blackList(), BlackListService],
})
export class BlackListModule {}
