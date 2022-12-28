import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorators/get-user.decorator';
import { ValidationBodyExceptionFilter } from '../../exceptions/validation-body-exception-filter';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { GetAllPostsdDto } from '../posts/dto/get-all-posts.dto';
import { PostsService } from '../posts/posts.service';
import { User } from '../../entity/user.entity';

import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetAllBlogsQueryDto } from './dto/get-all-blogs-query.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly postsService: PostsService,
  ) {}

  @Get()
  @HttpCode(200)
  async getAllBlogs(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    queryParams: GetAllBlogsQueryDto,
  ) {
    return await this.blogsService.getAllBlogsClearQuery(queryParams);
  }

  @Post()
  // @UseGuards(AuthGuard('basic'))
  @UseFilters(new ValidationBodyExceptionFilter())
  async createBlog(
    @Body(new CustomValidationPipe()) createBlogDto: CreateBlogDto,
  ) {
    return await this.blogsService.createBlogClearQuery(createBlogDto);
  }

  @Get(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBloggerById(
    @Param('id')
    blogId: // @Param('id', ParseUUIDPipe)
    string,
  ) {
    blogId;
    await this.blogsService.checkExistBlog(blogId);
    return await this.blogsService.getBlogByIdClearQuery(blogId);
  }

  @Put(':id')
  @HttpCode(204)
  // @UseGuards(AuthGuard('basic'))
  @UseFilters(new ValidationBodyExceptionFilter())
  async changeBlog(
    // asyn(
    // @Param('id', ParseUUIDPipe)
    @Param('id')
    blogId: string,
    @Body(new CustomValidationPipe()) createBlogDto: CreateBlogDto,
  ) {
    return await this.blogsService.changeBlogClearQuery({
      id: blogId,
      ...createBlogDto,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  // @UseGuards(AuthGuard('basic'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteBlog(
    @Param('id')
    blogId: // @Param('id', ParseUUIDPipe)
    string,
  ) {
    return await this.blogsService.deleteBlogByIdClearQuery(blogId);
  }

  @Get(':blogId/posts')
  @HttpCode(200)
  async getPostsForBloggerId(
    // @Param('blogId', ParseUUIDPipe)
    @Param('blogId')
    blogId: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    queryParams: GetAllPostsdDto,
    @GetUser() user: User,
  ) {
    return await this.postsService.getPostByBlogId({
      ...queryParams,
      blogId,
      userId: user ? user.id : null,
    });
  }

  @Post(':blogId/posts')
  @HttpCode(201)
  // @UseGuards(AuthGuard('basic'))
  @UseFilters(new ValidationBodyExceptionFilter())
  async createPostsForBloggerId(
    @Param('blogId', ParseUUIDPipe)
    blogId: string,
    @Body(new CustomValidationPipe())
    createPostDto: CreatePostDto,
  ) {
    return await this.postsService.createPost({
      ...createPostDto,
      blogId,
    });
  }
}
