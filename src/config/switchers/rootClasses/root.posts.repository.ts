import { Injectable } from '@nestjs/common';
import { ICreateDevice } from '../../../modules/devices/dto/createDevice.interface';
import { GetAllPostsdDto } from '../../../modules/posts/dto/get-all-posts.dto';

@Injectable()
export class RootPostsRepository {
  constructor() {}
  async getAllPostsClearQuery(
    dto: GetAllPostsdDto & { userId: string; blogId?: string },
  ) {
   
    return;
  }

  async createPost(dto: CreatePostWithBlogIdDto): Promise<> {
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

  async getPostByIdWithLikes(dto: { id: string; userId: string }) {
    const post = await this.dataSource.query(
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
    return postsQueryBuilder(post)[0];
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
