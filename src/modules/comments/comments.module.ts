import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from '../blogs/blogs.service';
import { JwtPassService } from '../common-services/jwt-pass-custom/jwt-pass.service';
import { Like } from '../likes/like.entity';
import { LikesRepository } from '../likes/likes.repository';
import { LikesService } from '../likes/likes.service';
import { Post } from '../posts/post.entity';
import { PostsService } from '../posts/posts.service';
import { PostsQueryRepository } from '../posts/postsClearQuert.repositiry';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { PostComment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsQueryRepository } from './commentsQuert.repositiry';

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
