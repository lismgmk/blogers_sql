import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RootBlogsRepository } from '../../../config/switchers/rootClasses/root.blogs.repository';
import { Blog } from '../../../entity/blog.entity';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { GetAllBlogsQueryDto } from '../dto/get-all-blogs-query.dto';

@Injectable()
export class BlogsQueryRepository extends RootBlogsRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {
    super();
  }

  async getCountRows(searchNameTerm: string) {
    return this.dataSource.query(
      `SELECT  COUNT("id")  FROM  public."blog" WHERE name like $1`,
      [`%${searchNameTerm}%`],
    );
  }

  async getAllBlogsClearQuery(dto: GetAllBlogsQueryDto & { offset: number }) {
    return this.dataSource.query(
      `
      SELECT id, "name", "youtube", "createdAt"
FROM public."blog"
WHERE name like $1
ORDER BY $2
LIMIT $3 OFFSET $4
`,
      [
        `%${dto.searchNameTerm}%`,
        `${dto.sortBy} ${dto.sortDirection}`,
        dto.pageSize,
        dto.offset,
      ],
    );
  }

  async createBlogClearQuery(dto: CreateBlogDto) {
    console.log(dto, 'createBlog');

    try {
      return this.dataSource.query(
        `INSERT INTO public."blog"(
	 name, "websiteUrl", "decription")
	VALUES ( $1, $2, now());`,
        [dto.name, dto.websiteUrl, dto.decription],
      );
    } catch (e) {
      console.log(e);
    }
  }
  async getBlogByIdClearQuery(id: string): Promise<Blog> {
    const queryComand = `
    SELECT * FROM public."blog"
WHERE id= $1
    `;
    const blog = await this.dataSource.query(queryComand, [id]);
    return blog[0];
  }

  async changeBlogClearQuery(dto: CreateBlogDto & { id: string }) {
    const queryComand = `
   UPDATE "blog"
SET name = $1, "websiteUrl" = $2, decription = $3
WHERE id = $4;
    `;
    await this.dataSource.query(queryComand, [
      dto.name,
      dto.websiteUrl,
      dto.decription,
      dto.id,
    ]);

    return;
  }

  async deleteBlogByIdClearQuery(id: string) {
    const queryComand = `
   DELETE FROM "blog"
WHERE id = $1;
    `;
    await this.dataSource.query(queryComand, [id]);

    return;
  }

  async checkExistBlog(id: string) {
    const post = await this.getBlogByIdClearQuery(id);
    if (!post) {
      throw new NotFoundException();
    }
  }
}
