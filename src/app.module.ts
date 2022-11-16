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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BlogsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE_NAME'),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
