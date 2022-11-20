import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicStrategy } from '../../strategyes/auth-basic.strategy';
import { JwtStrategy } from '../../strategyes/jwt.strategy';
import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { JwtService } from '@nestjs/jwt';
import { BlogsService } from '../blogs/blogs.service';
import { LikesService } from '../likes/likes.service';
import { Blog } from '../blogs/blog.entity';
import { PostsQueryRepository } from './postsClearQuert.repositiry';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Post, Blog])],
  controllers: [PostsController],
  providers: [
    PostsService,
    BasicStrategy,
    JwtStrategy,
    UsersService,
    JwtPassService,
    JwtService,
    PostsQueryRepository,
    LikesService,
    BlogsService,
  ],
})
export class PostsModule {}
