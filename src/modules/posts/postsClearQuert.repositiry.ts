import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { paginationBuilder } from '../../helpers/pagination-builder';
import { CreatePostWithBlogIdDto } from './dto/create-post-with-blog-id.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { GetAllPostsdDto } from './dto/get-all-posts.dto';

@Injectable()
export class PostsQueryRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  async getAllPostsClearQuery(dto: GetAllPostsdDto, userId: string) {
    const offset =
      dto.pageNumber === 1 ? 0 : (dto.pageNumber - 1) * dto.pageSize;
    // CEILING((SELECT  COUNT("id")  FROM  public.blog ) / $3) as "totalRows"
    const allRows = await this.dataSource.query(
      `SELECT  COUNT("id")  FROM  public."post" `,
    );
    `
SELECT "shortDescription", content, title, post."createdAt", "blogId", post.id, blog.name as "blogName",
(select count("id") from "like" where "like"."postId" = post."id" and "like"."status" = 'Like'  ) as "likeCount",
(select count("id") from "like" where "like"."postId" = post."id" and "like"."status" = 'Dislike' ) as "dislikeCount",
"like"."userId" as "likeInfoUserId",
"like"."created_at" AS "likeInfoCreated",
(select "user"."name" from "user" where "user"."id" = "like"."userId") as "likeInfoUser"
--(select "like"."userId" from "like") as "likeInfoUserId",
--(select "like"."created_at" from "like") as "likeInfoCreated"
	FROM public.post
	Join "blog" ON post."blogId" = blog.id
	Left join "like" ON post."id" = "like"."postId" 
`;
    const allPostsQuery = await this.dataSource.query(
      `SELECT "shortDescription", "content", "title", post."createdAt", "blogId", post."id", blog."name" as "blogName",  
      "like"."status" as "status",
      (select count("id") from "like" where "like"."postId" = post."id" and "like"."status" = 'Like' ) as "likeCount",
(select count("id") from "like" where "like"."postId" = post."id" and "like"."status" = 'Dislike' ) as "dislikeCount"	
      FROM public."post"
      	Join "blog" ON post."blogId" = blog."id"
        left join "like" ON post."id" = "like"."postId"
      ORDER BY $1
      LIMIT $2 OFFSET $3`,
      [
        `
        ${dto.sortBy} ${dto.sortDirection}`,
        dto.pageSize,
        offset,
      ],
    );
    return {
      ...paginationBuilder({
        totalCount: Number(allRows[0].count),
        pageSize: dto.pageSize,
        pageNumber: dto.pageNumber,
      }),
      items: allPostsQuery,
    };
  }

  async createPost(dto: CreatePostWithBlogIdDto) {
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

  async getPostById(id: string, userId?: string) {
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
