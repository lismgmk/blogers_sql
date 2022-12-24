import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RootPostsRepository } from '../../../config/switchers/rootClasses/root.posts.repository';
import { Post } from '../../../entity/post.entity';
import { IPostQuery } from '../../../helpers/post-query-builder';
import { CreatePostWithBlogIdDto } from '../dto/create-post-with-blog-id.dto';
import { GetAllPostsdDto } from '../dto/get-all-posts.dto';

@Injectable()
export class PostsQueryRepository extends RootPostsRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {
    super();
  }
  async getCountPosts(blogId: string = null) {
    return this.dataSource.query(
      `
	SELECT  COUNT("id")  FROM  public."post" 
	where "blogId" =(
	CASE
    	WHEN $1 != NULL  THEN $1::uuid 
    	ELSE "blogId"::uuid
	END)
	`,
      [blogId],
    );
  }
  async getAllPostsClearQuery(
    dto: GetAllPostsdDto & { userId: string; blogId?: string; offset: number },
  ): Promise<IPostQuery[]> {
    return await this.dataSource.query(
      `
      SELECT "shortDescription", "content", "title", "post"."createdAt", "blogId", "post"."id", "blog"."name" as "blogName",
(select count("id") from "like" where "like"."postId" = "post"."id" and "like"."status" = 'Like'  ) as "likeCount",
(select count("id") from "like" where "like"."postId" = "post"."id" and "like"."status" = 'Dislike' ) as "dislikeCount",
"like"."userId" as "likeInfoUserId",
"like"."created_at" AS "likeInfoCreated",
CASE
    WHEN "like"."userId" = $4  THEN "like"."status" 
    ELSE 'None'
END As "UserStatus",
(select "user"."name" from "user" where "user"."id" = "like"."userId" ) as "likeInfoUser"
	FROM "public"."post" 
	Left Join "blog" ON post."blogId" = "blog"."id"
	Left join ( Select *  from "like" where "like"."status"='Like' order by "created_at" ASC limit 3) as "like"  ON "post"."id" = "like"."postId" 
  where "blogId" =(
    CASE
    WHEN $5 != NULL  THEN $5::uuid 
    ELSE "blogId"::uuid
END
  )
  ORDER BY $1
      LIMIT $2 OFFSET $3
      
      `,
      [
        `${dto.sortBy} ${dto.sortDirection}`,
        dto.pageSize,
        dto.offset,
        dto.userId,
        dto.blogId,
      ],
    );
  }

  async createPost(dto: CreatePostWithBlogIdDto): Promise<Post> {
    const queryPostComand = `INSERT INTO public."post"(
	"shortDescription", "content", "title", "createdAt", "blogId")
	VALUES ($1, $2, $3, now(), $4 )
  RETURNING *
  `;
    const post = await this.dataSource.query(queryPostComand, [
      dto.shortDescription,
      dto.content,
      dto.title,
      dto.blogId,
    ]);
    return post[0];
  }

  async getPostByIdWithLikes(dto: {
    id: string;
    userId: string;
  }): Promise<IPostQuery[]> {
    return this.dataSource.query(
      `SELECT "shortDescription", "content", "title", "post"."createdAt", "blogId", "post"."id", "blog"."name" as "blogName",
(select count("id") from "like" where "like"."postId" = "post"."id" and "like"."status" = 'Like'  ) as "likeCount",
(select count("id") from "like" where "like"."postId" = "post"."id" and "like"."status" = 'Dislike' ) as "dislikeCount",
"like"."userId" as "likeInfoUserId",
"like"."created_at" AS "likeInfoCreated",
CASE
    WHEN "like"."userId" = $2  THEN "like"."status" 
    ELSE 'None'
END As "UserStatus",
(select "user"."name" from "user" where "user"."id" = "like"."userId" ) as "likeInfoUser"
	FROM "public"."post" 
	Left Join "blog" ON post."blogId" = "blog"."id"
	Left join ( Select *  from "like" where "like"."status"='Like' order by "created_at" ASC limit 3) as "like"  ON "post"."id" = "like"."postId" 
  where "post"."id" =$1`,
      [dto.id, dto.userId],
    );
  }

  async getPostById(id: string) {
    const queryComand = `
    SELECT * FROM public."post"
WHERE id= $1
    `;
    const post = await this.dataSource.query(queryComand, [id]);
    return post[0];
  }

  async changePost(dto: CreatePostWithBlogIdDto & { id: string }) {
    const queryComand = `
   UPDATE "post"
SET content = $1, shortDescription = $2, title = $3
WHERE id = $4;
    `;
    await this.dataSource.query(queryComand, [
      dto.content,
      dto.shortDescription,
      dto.title,
      dto.id,
    ]);

    return;
  }

  async deletePostById(id: string) {
    const queryComand = `
   DELETE FROM "post"
WHERE id = $1;
    `;
    await this.dataSource.query(queryComand, [id]);

    return;
  }
}
