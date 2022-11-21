import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ICreateComment } from './dto/comments-interfaces';

@Injectable()
export class CommentsQueryRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  async createComment(dto: Omit<ICreateComment, 'userLogin'>) {
    const queryPostComand = `INSERT INTO public."post_comment"(
	"content", "postId", "userId")
	VALUES ($1, $2, $3 )
  RETURNING *
  `;
    const comment = await this.dataSource.query(queryPostComand, [
      dto.content,
      dto.postId,
      dto.userId,
    ]);
    return comment[0];
  }

  async getCommentById(id: string) {
    const queryComand = `
    SELECT * FROM public."post_comment"
WHERE id= $1
    `;
    const comment = await this.dataSource.query(queryComand, [id]);
    return comment[0];
  }

  async changeComment(id: string, content: string) {
    const queryComand = `
   UPDATE "post_comment"
SET content = $1
WHERE id = $2;
    `;
    await this.dataSource.query(queryComand, [id, content]);

    return;
  }

  async deleteCommentById(id: string) {
    const queryComand = `
   DELETE FROM "post_comment"
WHERE id = $1;
    `;
    await this.dataSource.query(queryComand, [id]);

    return;
  }
}
