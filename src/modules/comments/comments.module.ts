import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from '../blogs/blogs.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { Like } from '../../entity/like.entity';
import { LikesRepository } from '../likes/likes.repository';
import { LikesService } from '../likes/likes.service';
import { PostsService } from '../posts/posts.service';
import { PostsQueryRepository } from '../posts/postsClearQuert.repositiry';
import { User } from '../../entity/user.entity';
import { UsersService } from '../users/users.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsQueryRepository } from './commentsQuert.repositiry';
import { PostComment } from '../../entity/comment.entity';
import { Post } from '../../entity/post.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Like, PostComment, Post, User]),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsQueryRepository,
    PostsQueryRepository,
    JwtPassService,
    JwtService,
    UsersService,
    LikesRepository,
    LikesService,
    PostsService,
    BlogsService,
  ],
})
export class CommentsModule {}
