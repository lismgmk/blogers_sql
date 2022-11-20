import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreatePostWithBlogIdDto } from './dto/create-post-with-blog-id.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsQueryRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

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
