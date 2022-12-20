import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';
import { Like } from '../../entity/like.entity';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikesService, rootInstanceSwitcher.likes()],
})
export class LikesModule {}
