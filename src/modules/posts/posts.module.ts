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
import { PostsQueryRepository } from './postsClearQuert.repositiry';
import { Like } from '../../entity/like.entity';
import { CommentsQueryRepository } from '../comments/commentsQuert.repositiry';
import { Post } from '../../entity/post.entity';
import { PostComment } from '../../entity/comment.entity';

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
    PostsQueryRepository,
    LikesService,
    BlogsService,
    LikesRepository,
    CommentsService,
    CommentsQueryRepository,
  ],
})
export class PostsModule {}
