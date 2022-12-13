import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RootPostsRepository } from '../../config/switchers/rootClasses/root.posts.repository';
import { Blog } from '../../entity/blog.entity';
import { LikeInfoRequest } from '../../global-dto/like-info.request';
import { paginationBuilder } from '../../helpers/pagination-builder';
import { postsQueryBuilder } from '../../helpers/post-query-builder';
import { BlogsService } from '../blogs/blogs.service';
import { CreatePostWithBlogIdDto } from './dto/create-post-with-blog-id.dto';
import { GetAllPostsdDto } from './dto/get-all-posts.dto';
import { IPostById } from './dto/get-post-by-id.interface';

@Injectable()
export class PostsService {
  constructor(
    private blogsService: BlogsService,
    private rootPostsRepository: RootPostsRepository,
  ) {}
  async getAllPosts(dto: GetAllPostsdDto, userId: string) {
    const offset =
      dto.pageNumber === 1 ? 0 : (dto.pageNumber - 1) * dto.pageSize;

    const allRows = await this.rootPostsRepository.getCountPosts();
    const allPostsQuery = await this.rootPostsRepository.getAllPostsClearQuery({
      ...dto,
      userId,
      blogId: null,
      offset,
    });

    return {
      ...paginationBuilder({
        totalCount: Number(allRows[0].count),
        pageSize: dto.pageSize,
        pageNumber: dto.pageNumber,
      }),
      items: postsQueryBuilder(allPostsQuery),
    };
  }

  async getPostByBlogId(
    dto: GetAllPostsdDto & { blogId: string; userId: string },
  ) {
    await this.blogsService.checkExistBlog(dto.blogId);
    const offset =
      dto.pageNumber === 1 ? 0 : (dto.pageNumber - 1) * dto.pageSize;

    const allRows = await this.rootPostsRepository.getCountPosts(dto.blogId);
    const allPostsQuery = await this.rootPostsRepository.getAllPostsClearQuery({
      ...dto,
      blogId: null,
      offset,
    });

    return {
      ...paginationBuilder({
        totalCount: Number(allRows[0].count),
        pageSize: dto.pageSize,
        pageNumber: dto.pageNumber,
      }),
      items: postsQueryBuilder(allPostsQuery),
    };
  }

  async getPostById(dto: IPostById) {
    await this.checkExistPost(dto.id);
    const post = await this.rootPostsRepository.getPostByIdWithLikes(dto);
    return postsQueryBuilder(post)[0];
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
    const createdPost = await this.rootPostsRepository.createPost(newPost);

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
    await this.rootPostsRepository.changePost({ id: dto.id, ...dto });
  }

  async checkExistPost(id: string) {
    const post = await this.rootPostsRepository.getPostById(id);
    if (!post) {
      throw new NotFoundException();
    }
  }
  async deletePostById(id: string) {
    const post = await this.rootPostsRepository.getPostById(id);
    if (!post) {
      throw new NotFoundException();
    }
    return this.rootPostsRepository.getPostById(id);
  }
}
