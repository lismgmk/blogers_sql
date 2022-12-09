import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configRoot } from './config/configuration';
import { migrationTypeOrmConfig } from './config/migration';
import { typeOrmConfigAsync } from './config/ormconfig';
import { BlackList } from './entity/black-list.entity';
import { Blog } from './entity/blog.entity';
import { CheckIpAttempt } from './entity/checkIpAttempt.entity';
import { PostComment } from './entity/comment.entity';
import { Device } from './entity/device.entity';
import { Like } from './entity/like.entity';
import { Post } from './entity/post.entity';
import { User } from './entity/user.entity';
import { CheckBearerMiddleware } from './middlewares/check-bearer.middleware';
import { CheckIpStatusMiddleware } from './middlewares/check-ip-status.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { BlackListModule } from './modules/black-list/black-list.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { CheckIpAttemptModule } from './modules/check-ip-attempt/check-ip-attempt.module';
import { CheckIpAttemptService } from './modules/check-ip-attempt/check-ip-attempt.service';
import { CommentsModule } from './modules/comments/comments.module';
import { JwtPassModule } from './modules/common-services/jwt-pass-custom/jwt-pass.module';
import { JwtPassService } from './modules/common-services/jwt-pass-custom/jwt-pass.service';
import { MailModule } from './modules/common-services/mail/mail.module';
import { DevicesModule } from './modules/devices/devices.module';
import { LikesModule } from './modules/likes/likes.module';
import { PostsModule } from './modules/posts/posts.module';
import { TestingModule } from './modules/testing/testing.module';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
@Module({
  imports: [
    ConfigModule.forRoot(configRoot),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    BlogsModule,
    PostsModule,
    UsersModule,
    LikesModule,
    JwtPassModule,
    AuthModule,
    BlackListModule,
    DevicesModule,
    MailModule,
    CommentsModule,
    TestingModule,
    CheckIpAttemptModule,
  ],
  controllers: [],
  providers: [JwtPassService, UsersService, JwtService, CheckIpAttemptService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckIpStatusMiddleware)
      .forRoutes(
        { path: '/auth/registration', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.DELETE },
        { path: 'refresh-token', method: RequestMethod.POST },
        { path: '/security/devices', method: RequestMethod.GET },
      );
    consumer.apply(CheckBearerMiddleware).forRoutes(
      {
        path: '/posts/:postId/comments',
        method: RequestMethod.GET,
      },
      {
        path: '/blogs/:postId/posts',
        method: RequestMethod.GET,
      },
      {
        path: '/posts',
        method: RequestMethod.GET,
      },
      {
        path: '/posts/:postId/comments',
        method: RequestMethod.GET,
      },
      {
        path: '/posts/:postId',
        method: RequestMethod.GET,
      },
      {
        path: '/comments/:id',
        method: RequestMethod.GET,
      },
    );
  }
}
