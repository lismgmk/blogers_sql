import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ILikeInfo } from './dto/create-like.interface';

@Injectable()
export class LikesRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  async getLikePost(postId: string) {
    const queryComand = `
    SELECT * FROM public."like"
WHERE "postId"= $1
    `;
    const like = await this.dataSource.query(queryComand, [postId]);
    return like[0];
  }

  async getLikeCommentPost(commentId: string) {
    const queryComand = `
    SELECT * FROM public."like"
WHERE "commentId"= $1
    `;
    const like = await this.dataSource.query(queryComand, [commentId]);
    return like[0];
  }

  async createLikeForPost(dto: Omit<ILikeInfo, 'commentId'>) {
    const queryPostComand = `INSERT INTO public."like"(
	"status", "userId", "postId")
	VALUES ($1, $2, $3 )
  RETURNING *
  `;
    const post = await this.dataSource.query(queryPostComand, [
      dto.status,
      dto.userId,
      dto.postId,
    ]);
    return post[0];
  }

  async changeLikeStatusPost(dto: Omit<ILikeInfo, 'commentId'>) {
    const queryComand = `
   UPDATE "like"
SET status = $1
WHERE "userId" = $2 and "postId" = $3
RETURNING *
`;
    return this.dataSource.query(queryComand, [
      dto.status,
      dto.userId,
      dto.postId,
    ]);
  }

  async createLikeForComment(dto: Omit<ILikeInfo, 'postId'>) {
    const queryPostComand = `INSERT INTO public."like"(
	"status", "userId", "commentId")
	VALUES ($1, $2, $3 )
  RETURNING *
  `;
    const post = await this.dataSource.query(queryPostComand, [
      dto.status,
      dto.userId,
      dto.commentId,
    ]);
    return post[0];
  }

  async changeLikeStatusComment(dto: Omit<ILikeInfo, 'postId'>) {
    const queryComand = `
   UPDATE "like"
SET status = $1
WHERE "userId" = $2 and "commentId" = $3
RETURNING *
`;
    return this.dataSource.query(queryComand, [
      dto.status,
      dto.userId,
      dto.commentId,
    ]);
  }
}
