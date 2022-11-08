import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './modules/blogs/blog.entity';
import { BlogsModule } from './modules/blogs/blogs.module';
import { Post } from './modules/posts/post.entity';

@Module({
  imports: [
    BlogsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blog_sql-db',
      entities: [Blog, Post],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
