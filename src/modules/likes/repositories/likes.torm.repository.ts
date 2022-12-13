import { Like } from './../../../entity/like.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RootLikesRepository } from '../../../config/switchers/rootClasses/root.likes.repository';
import { ILikeInfo } from '../dto/create-like.interface';

@Injectable()
export class LikesTormRepository extends RootLikesRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {
    super();
  }

  async getLikePost(postId: string): Promise<Like> {
    const queryComand = `
    SELECT * FROM public."like"
WHERE "postId"= $1
    `;
    const like = await this.dataSource.query(queryComand, [postId]);
    return like[0];
  }

  async getLikeCommentPost(commentId: string): Promise<Like> {
    const queryComand = `
    SELECT * FROM public."like"
WHERE "commentId"= $1
    `;
    const like = await this.dataSource.query(queryComand, [commentId]);
    return like[0];
  }

  async createLikeForPost(dto: Omit<ILikeInfo, 'commentId'>): Promise<Like> {
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

  async createLikeForComment(dto: Omit<ILikeInfo, 'postId'>): Promise<Like> {
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
