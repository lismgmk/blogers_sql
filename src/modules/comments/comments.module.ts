import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../likes/like.entity';
import { PostComment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Like, PostComment])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
