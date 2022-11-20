import { Module } from '@nestjs/common';
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
import * as Joi from 'joi';
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
        entities: [Blog, Post],
        synchronize: true,
        autoLoadEntities: true,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
