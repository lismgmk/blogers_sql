import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikeInfoRequest } from '../../global-dto/like-info.request';
import { Blog } from '../blogs/blog.entity';
import { BlogsService } from '../blogs/blogs.service';
import { CreatePostWithBlogIdDto } from './dto/create-post-with-blog-id.dto';
import { GetAllPostsdDto } from './dto/get-all-posts.dto';
import { IPostById } from './dto/get-post-by-id.interface';
import { PostsQueryRepository } from './postsClearQuert.repositiry';

@Injectable()
export class PostsService {
  constructor(
    private blogsService: BlogsService,
    private postsQueryRepository: PostsQueryRepository,
  ) {}
  async getAllPosts(queryParams: GetAllPostsdDto, userId: string) {
    return this.postsQueryRepository.getAllPostsClearQuery({
      ...queryParams,
      userId,
      blogId: null,
    });
  }

  async getPostByBlogId(
    dto: GetAllPostsdDto & { blogId: string; userId: string },
  ) {
    await this.blogsService.checkExistBlog(dto.blogId);
    return this.postsQueryRepository.getAllPostsClearQuery(dto);
  }

  async getPostById(dto: IPostById) {
    await this.checkExistPost(dto.id);
    return this.postsQueryRepository.getPostByIdWithLikes(dto);
  }

  async createPost(dto: CreatePostWithBlogIdDto) {
    const currentBlog = (await this.blogsService.getBlogByIdClearQuery(
      dto.blogId,
    )) as Blog;
    if (!currentBlog) {
      throw new BadRequestException({
        message: { message: 'blog does not found', field: 'blogId' },
      });
    }
    const newPost = {
      title: dto.title,
      content: dto.content,
      shortDescription: dto.shortDescription,
      blogId: dto.blogId,
    };
    const createdPost = await this.postsQueryRepository.createPost(newPost);

    const extendedLikesInfo: LikeInfoRequest = {
      likesCount: 0,
      dislikesCount: 0,
      myStatus: 'None',
      newestLikes: [],
    };
    return {
      id: createdPost.id,
      title: createdPost.title,
      shortDescription: createdPost.shortDescription,
      content: createdPost.content,
      blogId: currentBlog.id,
      blogName: currentBlog.name,
      createdAt: createdPost.createdAt,
      extendedLikesInfo,
    };
  }
  async changePost(dto: CreatePostWithBlogIdDto & { id: string }) {
    await this.blogsService.checkExistBlog(dto.blogId);
    await this.postsQueryRepository.changePost({ id: dto.id, ...dto });
  }

  async checkExistPost(id: string) {
    const post = await this.postsQueryRepository.getPostById(id);
    if (!post) {
      throw new NotFoundException();
    }
  }
}
