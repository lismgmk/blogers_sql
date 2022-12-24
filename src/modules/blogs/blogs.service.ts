import { Injectable, NotFoundException } from '@nestjs/common';
import { RootBlogsRepository } from '../../config/switchers/rootClasses/root.blogs.repository';
import { Blog } from '../../entity/blog.entity';
import { paginationBuilder } from './../../helpers/pagination-builder';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetAllBlogsQueryDto } from './dto/get-all-blogs-query.dto';

@Injectable()
export class BlogsService {
  constructor(private blogsQueryRepository: RootBlogsRepository) {}

  async getAllBlogsClearQuery(dto: GetAllBlogsQueryDto) {
    const offset =
      dto.pageNumber === 1 ? 0 : (dto.pageNumber - 1) * dto.pageSize;

    const allRows = await this.blogsQueryRepository.getCountRows(
      dto.searchNameTerm,
    );
    const allBlogsQuery = await this.blogsQueryRepository.getAllBlogsClearQuery(
      { ...dto, offset },
    );
    return {
      ...paginationBuilder({
        totalCount: Number(allRows[0].count),
        pageSize: dto.pageSize,
        pageNumber: dto.pageNumber,
      }),
      items: allBlogsQuery,
    };
  }

  async createBlogClearQuery(dto: CreateBlogDto) {
    return this.blogsQueryRepository.createBlogClearQuery(dto);
  }

  async getBlogByIdClearQuery(id: string): Promise<Blog> {
    return this.blogsQueryRepository.getBlogByIdClearQuery(id);
  }

  async changeBlogClearQuery(dto: CreateBlogDto & { id: string }) {
    return this.blogsQueryRepository.changeBlogClearQuery(dto);
  }

  async deleteBlogByIdClearQuery(id: string) {
    return this.blogsQueryRepository.deleteBlogByIdClearQuery(id);
  }

  async checkExistBlog(id: string) {
    const post = await this.getBlogByIdClearQuery(id);
    if (!post) {
      throw new NotFoundException();
    }
  }
}
