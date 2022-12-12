import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../../../modules/blogs/dto/create-blog.dto';
import { GetAllBlogsQueryDto } from '../../../modules/blogs/dto/get-all-blogs-query.dto';

@Injectable()
export class RootBlogsRepository {
  constructor() {}

  async getAllBlogsClearQuery(dto: GetAllBlogsQueryDto) {
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
