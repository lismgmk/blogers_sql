import { Injectable } from '@nestjs/common';
import { INCORRECT_TYPE_VALIDATION_ERROR } from '@app/consts/ad-validation-const';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { GetAllBlogsQueryDto } from './dto/get-all-blogs-query.dto';
import { validateHeaderValue } from 'http';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
    @InjectDataSource() protected dataSource: DataSource,
  ) {}

  async getAllBlogs(dto: GetAllBlogsQueryDto) {
    return this.dataSource.query(
      `
      SELECT id, name, youtube, "createdAt",
 (SELECT COUNT("id")  FROM  public.blog) as "totalPage"
FROM public.blog
ORDER BY "id"
LIMIT $1 OFFSET 0
`,
      [`${dto.pageSize}`],
    );
    // "pagesCount": 0,
    //   "page": 0,
    //   "pageSize": 0,
    //   "totalCount": 0,
    try {
      const allBlogs = await this.blogsRepository
        .createQueryBuilder('blog')
        .orderBy('blog.' + dto.sortBy, dto.sortDirection)
        .skip(dto.pageNumber > 0 ? (dto.pageNumber - 1) * dto.pageSize : 0)
        .take(dto.pageSize)
        .setParameters({ name: dto.searchNameTerm })
        .getMany();
      return allBlogs;
    } catch (e) {
      console.log(e);
    }

    // const allBlogs: IBlog[] = (
    //   await this.blogsModel
    //     .find(filter)
    //     .sort({ [queryParams.sortBy]: queryParams.sortDirection })
    //     .skip(
    //       queryParams.pageNumber > 0
    //         ? (queryParams.pageNumber - 1) * queryParams.pageSize
    //         : 0,
    //     )
    //     .limit(queryParams.pageSize)
    //     .lean()
    // ).map((i) => {
    //   return {
    //     id: i._id,
    //     name: i.name,
    //     createdAt: i.createdAt,
    //     youtubeUrl: i.youtubeUrl,
    //   };
    // });

    // const totalCount = await this.blogsModel.countDocuments().exec();
    // const paginationParams: paramsDto = {
    //   totalCount: totalCount,
    //   pageSize: queryParams.pageSize,
    //   pageNumber: queryParams.pageNumber,
    // };
    // return {
    //   ...paginationBuilder(paginationParams),
    //   items: allBlogs,
    // };

    // this.blogsRepository.find();
    // return INCORRECT_TYPE_VALIDATION_ERROR;
  }
}
