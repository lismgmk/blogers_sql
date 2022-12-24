import { Injectable } from '@nestjs/common';
import { Blog } from '../../../entity/blog.entity';
import { CreateBlogDto } from '../../../modules/blogs/dto/create-blog.dto';
import { GetAllBlogsQueryDto } from '../../../modules/blogs/dto/get-all-blogs-query.dto';

@Injectable()
export class RootBlogsRepository {
  constructor() {}
  async getCountRows(searchNameTerm: string) {
    return;
  }
  async getAllBlogsClearQuery(dto: GetAllBlogsQueryDto & { offset: number }) {
    return;
  }

  async getBlogByIdClearQuery(id: string): Promise<Blog> {
    return;
  }

  async createBlogClearQuery(dto: CreateBlogDto) {
    return;
  }

  async changeBlogClearQuery(dto: CreateBlogDto & { id: string }) {
    return;
  }

  async deleteBlogByIdClearQuery(id: string) {
    return;
  }

  async checkExistBlog(id: string) {
    return;
  }
}
