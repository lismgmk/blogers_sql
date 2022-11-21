import { CommentsService } from './../comments/comments.service';
import { PostsQueryRepository } from './postsClearQuert.repositiry';
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
import { SkipThrottle } from '@nestjs/throttler';
import { GetUser } from '../../decorators/get-user.decorator';
import { CommonErrorFilter } from '../../exceptions/common-error-filter';
import { ValidationBodyExceptionFilter } from '../../exceptions/validation-body-exception-filter';
import { LikeStatusDto } from '../../global-dto/like-status.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomValidationPipe } from '../../pipes/validation.pipe';
import { User } from '../users/user.entity';
import { CreatePostWithBlogIdDto } from './dto/create-post-with-blog-id.dto';
import { GetAllPostsdDto } from './dto/get-all-posts.dto';
import { PostsService } from './posts.service';
import { LikesService } from '../likes/likes.service';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsQueryRepository: PostsQueryRepository,
    private readonly likesService: LikesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllPosts(
    @Query() queryParams: GetAllPostsdDto,
    @GetUser()
    user: User,
  ) {
    return await this.postsService.getAllPosts(
      queryParams,
      user ? user.id : null,
    );
  }

  @Post()
  @UseGuards(AuthGuard('basic'))
  @UseFilters(new ValidationBodyExceptionFilter())
  async createPost(
    @Body(new CustomValidationPipe())
    createPostDto: CreatePostWithBlogIdDto,
  ) {
    return await this.postsService.createPost(createPostDto);
  }

  @Put(':postId/like-status')
  @HttpCode(204)
  @UseFilters(new ValidationBodyExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async addLikeStatusePost(
    @Param('postId', ParseUUIDPipe)
    postId: string,
    @GetUserId()
    userId: string,
    @Body(new CustomValidationPipe())
    status: LikeStatusDto,
  ) {
    return await this.likesService.upDateLikesInfo({
      userId,
      status: status.likeStatus,
      postId,
    });
  }

  // @Get(':postId/comments')
  // @HttpCode(200)
  // @SkipThrottle()
  // async getPostsForBloggerId(
  //   @Param('postId')
  //   postId: string,
  //   @Query(
  //     new ValidationPipe({
  //       transform: true,
  //       transformOptions: { enableImplicitConversion: true },
  //     }),
  //   )
  //   queryParams: GetAllCommentsDto,
  //   @GetUser() user: User,
  // ) {
  //   return this.commentsService.getCommentsForPostId(
  //     queryParams,
  //     postId,
  //     user ? user._id : null,
  //   );
  // }

  @Post(':postId/comments')
  @HttpCode(201)
  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  @UseFilters(new CommonErrorFilter())
  @UseFilters(new ValidationBodyExceptionFilter())
  async createPostsForBloggerId(
    @Param('postId', ParseUUIDPipe)
    postId: string,
    @Body(new CustomValidationPipe())
    content: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return await this.commentsService.createComment({
      postId,
      ...content,
      userId: user ? user.id : null,
      userLogin: user.name,
    });
  }

  @Get(':postId')
  @HttpCode(200)
  async getPostById(
    @Param('postId', ParseUUIDPipe)
    postId: string,
    @GetUser() user: User,
  ) {
    return this.postsQueryRepository.getPostById(postId, user ? user.id : null);
  }

  @Put(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('basic'))
  @UseFilters(new ValidationBodyExceptionFilter())
  async changeBlog(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new CustomValidationPipe())
    createPostDto: CreatePostWithBlogIdDto,
  ) {
    return await this.postsService.changePost({ id, ...createPostDto });
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('basic'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteBlog(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return await this.postsQueryRepository.deletePostById(id);
  }
}
