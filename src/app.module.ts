import { User } from './modules/users/user.entity';
import { Like } from './modules/likes/like.entity';
import { Device } from './modules/devices/device.entity';
import { CheckIpAttempt } from './modules/check-ip-attempt/checkIpAttempt.entity';
import { BlackList } from './modules/black-list/black-list.entity';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './modules/blogs/blog.entity';
import { BlogsModule } from './modules/blogs/blogs.module';
import { Post } from './modules/posts/post.entity';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { LikesModule } from './modules/likes/likes.module';
import { JwtPassModule } from './modules/common-services/jwt-pass-custom/jwt-pass.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlackListModule } from './modules/black-list/black-list.module';
import { DevicesModule } from './modules/devices/devices.module';
import { MailModule } from './modules/common-services/mail/mail.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TestingModule } from './modules/testing/testing.module';
// import { CommentsController } from './testing/comments/comments.controller';
import Joi from 'joi';
import { CheckBearerMiddleware } from './middlewares/check-bearer.middleware';
import { JwtPassService } from './modules/common-services/jwt-pass-custom/jwt-pass.service';
import { UsersService } from './modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CheckIpAttemptModule } from './modules/check-ip-attempt/check-ip-attempt.module';
import { PostComment } from './modules/comments/comment.entity';
import { CheckIpStatusMiddleware } from './middlewares/check-ip-status.middleware';
import { CheckIpAttemptService } from './modules/check-ip-attempt/check-ip-attempt.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    BlogsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: +configService.get<string>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [
          Blog,
          Post,
          PostComment,
          BlackList,
          CheckIpAttempt,
          Device,
          Like,
          User,
        ],
        synchronize: true,
        autoLoadEntities: true,
        extra: {
          max: 5,
        },
      }),
      inject: [ConfigService],
    }),
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
