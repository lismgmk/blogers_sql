import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { commentsQueryBuilder } from '../../helpers/comment-query-builder';
import { paginationBuilder } from '../../helpers/pagination-builder';
import { ICreateComment } from './dto/comments-interfaces';
import { GetAllCommentsDto } from './dto/get-all-comments.dto';

@Injectable()
export class CommentsQueryRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  async getAllCommentsByPostId(
    dto: GetAllCommentsDto & { postId: string; userId: string },
  ) {
    const offset =
      dto.pageNumber === 1 ? 0 : (dto.pageNumber - 1) * dto.pageSize;
    const allRows = await this.dataSource.query(
      `SELECT  COUNT("id")  FROM  public."post_comment" `,
    );

    const allCommentsQuery = await this.dataSource.query(
      `SELECT "post_comment".id, "post_comment".content, "post_comment".created_at, "post_comment"."userId",
(select "user"."name" from "user" where "user"."id" = "like"."userId" ) as "UserName",
(select count("id") from "like" where "like"."commentId" = post_comment."id" and "like"."status" = 'Like'  ) as "likeCount",
(select count("id") from "like" where "like"."commentId" = post_comment."id" and "like"."status" = 'Dislike' ) as "dislikeCount",
CASE
    WHEN "like"."userId" != $4  THEN 'None'
    ELSE "like"."status"
END As "UserStatus"
	FROM public.post_comment 
	 join "user" ON "user"."id" = "post_comment"."userId" 
	 and "post_comment"."postId"=$5
    left join "like" ON "user"."id" = "like"."userId"
  ORDER BY $1
      LIMIT $2 OFFSET $3`,
      [
        `${dto.sortBy} ${dto.sortDirection}`,
        dto.pageSize,
        offset,
        dto.userId,
        dto.postId,
      ],
    );

    return {
      ...paginationBuilder({
        totalCount: Number(allRows[0].count),
        pageSize: dto.pageSize,
        pageNumber: dto.pageNumber,
      }),
      // items: postsQueryBuilder(allPostsQuery),
      items: commentsQueryBuilder(allCommentsQuery),
    };
  }

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
