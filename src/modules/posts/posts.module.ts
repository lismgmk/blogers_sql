import { CommentsService } from './../comments/comments.service';
import { LikesRepository } from './../likes/likes.repository';
import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicStrategy } from '../../strategyes/auth-basic.strategy';
import { JwtStrategy } from '../../strategyes/jwt.strategy';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { JwtService } from '@nestjs/jwt';
import { BlogsService } from '../blogs/blogs.service';
import { LikesService } from '../likes/likes.service';
import { Blog } from '../../entity/blog.entity';
import { Like } from '../../entity/like.entity';
import { Post } from '../../entity/post.entity';
import { PostComment } from '../../entity/comment.entity';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Post, Blog, Like, PostComment]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    BasicStrategy,
    JwtStrategy,
    UsersService,
    JwtPassService,
    JwtService,
    rootInstanceSwitcher.posts(),
    rootInstanceSwitcher.comments(),
    LikesService,
    BlogsService,
    LikesRepository,
    CommentsService,
  ],
})
export class PostsModule {}
