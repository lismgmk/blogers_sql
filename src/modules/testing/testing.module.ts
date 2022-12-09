import { BlackList } from '../../entity/black-list.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { TestingController } from './testing.controller';
import { TestingService } from './testing.service';
import { Blog } from '../../entity/blog.entity';
import { Like } from '../../entity/like.entity';
import { Device } from '../../entity/device.entity';
import { PostComment } from '../../entity/comment.entity';
import { Post } from '../../entity/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      BlackList,
      Device,
      Blog,
      Like,
      PostComment,
      Post,
    ]),
  ],
  controllers: [TestingController],
  providers: [TestingService],
})
export class TestingModule {}
