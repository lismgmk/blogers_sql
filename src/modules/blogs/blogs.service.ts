import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { paginationBuilder } from './../../helpers/pagination-builder';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetAllBlogsQueryDto } from './dto/get-all-blogs-query.dto';

@Injectable()
export class BlogsService {
  constructor(
    // @InjectRepository(Blog)
    // private blogsRepository: Repository<Blog>,
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async getAllBlogsClearQuery(dto: GetAllBlogsQueryDto) {
    const foo = (keyString, nestedObg) => {
      const arrKeys = keyString.split('.');

      let tempObj = nestedObg;
      for (let i = 0; i < arrKeys.length; i++) {
        if (tempObj[arrKeys[i]]) {
          tempObj = tempObj[arrKeys[i]];
        }
      }
      return tempObj;
      // let helperArr;
      // const helper = (obj) => {
      //   Object.entries(obj).forEach(([key, val], index) => {
      //     if (arrKeys[index] !== key) {
      //       helperArr = 'error';
      //       return;
      //     }
      //     if (typeof val === 'object' && arrKeys[index] === key) {
      //       arrKeys.shift();
      //       return helper(val);
      //     } else {
      //       helperArr = val;
      //       return;
      //     }
      //   });
      // };

      // helper(nestedObg);
      // return helperArr;
    };
    console.log(
      foo('car.mercedes.good', { car: { mercedes: { good: true } } }),
      'ddddd+++ddddddddd+',
    );

    // const cary = (fn) => {
    //   return (...args) => {
    //     if (fn.length > args.length) {
    //       const f = fn.bind(null, args);
    //       cary(f);
    //     } else return fn(...args);
    //   };
    // };

    // const sum = (a, b, c, d) => a + b + c + d;
    // const x: any = cary(sum);
    // console.log(x(1)(2)(3, 4));

    const offset =
      dto.pageNumber === 1 ? 0 : (dto.pageNumber - 1) * dto.pageSize;
    // CEILING((SELECT  COUNT("id")  FROM  public.blog ) / $3) as "totalRows"
    const allRows = await this.dataSource.query(
      `SELECT  COUNT("id")  FROM  public."blog" WHERE name like $1`,
      [`%${dto.searchNameTerm}%`],
    );

    const allBlogsQuery = await this.dataSource.query(
      `
      SELECT id, name, youtube, "createdAt"
FROM public."blog"
WHERE name like $1
ORDER BY $2
LIMIT $3 OFFSET $4
`,
      [
        `%${dto.searchNameTerm}%`,
        `${dto.sortBy} ${dto.sortDirection}`,
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
      items: allBlogsQuery,
    };
  }

  async createBlogClearQuery(dto: CreateBlogDto) {
    try {
      return this.dataSource.query(
        `INSERT INTO public."blog"(
	 name, youtube, "createdAt")
	VALUES ( $1, $2, now());`,
        [dto.name, dto.youtubeUrl],
      );
    } catch (e) {
      console.log(e);
    }
  }
  async getBlogByIdClearQuery(id: string) {
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
SET name = $1, youtube = $2
WHERE id = $3;
    `;
    await this.dataSource.query(queryComand, [
      dto.name,
      dto.youtubeUrl,
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
