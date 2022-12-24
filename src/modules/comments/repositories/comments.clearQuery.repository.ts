import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RootCommentsRepository } from '../../../config/switchers/rootClasses/root.comments.repository';
import { PostComment } from '../../../entity/comment.entity';
import { ICommentQuery } from '../../../helpers/comment-query-builder';
import { ICreateComment } from '../dto/comments-interfaces';
import { GetAllCommentsDto } from '../dto/get-all-comments.dto';
import { ICommentById } from '../dto/get-comment-by-id.interface';

@Injectable()
export class CommentsQueryRepository extends RootCommentsRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {
    super();
  }

  async getCountRows(id: string) {
    return await this.dataSource.query(
      `SELECT  COUNT("id")  FROM  public."post_comment" where "postId"=$1`,
      [id],
    );
  }

  async getAllCommentsByPostId(
    dto: GetAllCommentsDto & { postId: string; userId: string; offset: number },
  ): Promise<ICommentQuery[]> {
    return this.dataSource.query(
      `SELECT "post_comment".id, "post_comment".content, "post_comment".created_at, "post_comment"."userId",
(select "user"."name" from "user" where "user"."id" = "post_comment"."userId" ) as "UserName",
(select count("id") from "like" where "like"."commentId" = post_comment."id" and "like"."status" = 'Like'  ) as "likeCount",
(select count("id") from "like" where "like"."commentId" = post_comment."id" and "like"."status" = 'Dislike' ) as "dislikeCount",
CASE
    WHEN "like"."userId" = $4  THEN "like"."status" 
    ELSE 'None'
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
        dto.offset,
        dto.userId,
        dto.postId,
      ],
    );
  }

  async getCommentsByPostIdWithLikes(
    dto: ICommentById,
  ): Promise<ICommentQuery[]> {
    const comment = await this.dataSource.query(
      `SELECT "post_comment".id, "post_comment".content, "post_comment".created_at, "post_comment"."userId",
(select "user"."name" from "user" where "user"."id" = "post_comment"."userId" ) as "UserName",
(select count("id") from "like" where "like"."commentId" = post_comment."id" and "like"."status" = 'Like'  ) as "likeCount",
(select count("id") from "like" where "like"."commentId" = post_comment."id" and "like"."status" = 'Dislike' ) as "dislikeCount",
CASE
    WHEN "like"."userId" = $2  THEN "like"."status" 
    ELSE 'None'
END As "UserStatus"
	FROM public.post_comment 
	 join "user" ON "user"."id" = "post_comment"."userId" 
	 and "post_comment"."id"=$1
    left join "like" ON "user"."id" = "like"."userId"
`,
      [dto.id, dto.userId],
    );
    return comment;
  }

  async createComment(
    dto: Omit<ICreateComment, 'userLogin'>,
  ): Promise<PostComment> {
    const queryPostComand = `
INSERT INTO public."post_comment"(
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

  async getCommentById(id: string): Promise<PostComment> {
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
