import { PostsService } from './../posts/posts.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicStrategy } from '../../strategyes/auth-basic.strategy';
import { Like } from '../../entity/like.entity';
import { PostsQueryRepository } from '../posts/postsClearQuert.repositiry';
import { Blog } from '../../entity/blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Post } from '../../entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Post, Like]), PassportModule],
  controllers: [BlogsController],
  providers: [BlogsService, BasicStrategy, PostsQueryRepository, PostsService],
})
export class BlogsModule {}
