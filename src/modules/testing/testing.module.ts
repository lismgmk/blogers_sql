import { Post } from './../posts/post.entity';
import { Device } from './../devices/device.entity';
import { BlackList } from './../black-list/black-list.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { TestingController } from './testing.controller';
import { TestingService } from './testing.service';
import { Blog } from '../blogs/blog.entity';
import { Like } from '../likes/like.entity';
import { PostComment } from '../comments/comment.entity';

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
