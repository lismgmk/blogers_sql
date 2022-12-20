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
import { User } from '../../entity/user.entity';
import { UsersService } from '../users/users.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PostComment } from '../../entity/comment.entity';
import { Post } from '../../entity/post.entity';
import { rootInstanceSwitcher } from '../../config/switchers/rootSwitcher';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Like, PostComment, Post, User]),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    rootInstanceSwitcher.comments(),
    rootInstanceSwitcher.posts(),
    rootInstanceSwitcher.blogs(),
    rootInstanceSwitcher.users(),
    rootInstanceSwitcher.likes(),
    JwtPassService,
    JwtService,
    UsersService,
    LikesService,
    PostsService,
    BlogsService,
  ],
})
export class CommentsModule {}
