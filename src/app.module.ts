import { Module } from '@nestjs/common';
import { BlogsModule } from './modules/blogs/blogs.module';

@Module({
  imports: [BlogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
