import { PostsService } from './../posts/posts.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicStrategy } from '../../strategyes/auth-basic.strategy';
import { Like } from '../../entity/like.entity';
import { Blog } from '../../entity/blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Post } from '../../entity/post.entity';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Post, Like]), PassportModule],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    BasicStrategy,
    rootInstanceSwitcher.posts(),
    PostsService,
  ],
})
export class BlogsModule {}
