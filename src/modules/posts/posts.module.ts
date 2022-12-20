import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';
import { Blog } from '../../entity/blog.entity';
import { PostComment } from '../../entity/comment.entity';
import { Like } from '../../entity/like.entity';
import { Post } from '../../entity/post.entity';
import { BasicStrategy } from '../../strategyes/auth-basic.strategy';
import { JwtStrategy } from '../../strategyes/jwt.strategy';
import { BlogsService } from '../blogs/blogs.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { LikesService } from '../likes/likes.service';
import { CommentsService } from './../comments/comments.service';
import { UsersService } from './../users/users.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Post, Blog, Like, PostComment]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    LikesService,
    BlogsService,
    CommentsService,
    UsersService,
    rootInstanceSwitcher.posts(),
    rootInstanceSwitcher.comments(),
    rootInstanceSwitcher.users(),
    rootInstanceSwitcher.likes(),
    rootInstanceSwitcher.blogs(),
    BasicStrategy,
    JwtStrategy,
    JwtPassService,
    JwtService,
  ],
})
export class PostsModule {}
