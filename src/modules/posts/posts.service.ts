import { PostsQueryRepository } from './postsClearQuert.repositiry';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikeInfoRequest } from '../../global-dto/like-info.request';
import { LikeStatusEnum } from '../../global-dto/like-status.dto';
import { Blog } from '../blogs/blog.entity';
import { BlogsService } from '../blogs/blogs.service';
import { LikesService } from '../likes/likes.service';
import { User } from '../users/user.entity';
import { CreatePostWithBlogIdDto } from './dto/create-post-with-blog-id.dto';
import { GetAllPostsdDto } from './dto/get-all-posts.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    private blogsService: BlogsService,
    private postsQueryRepository: PostsQueryRepository,
  ) {}
  async getAllPosts(queryParams: GetAllPostsdDto, userId: string) {
    return this.postsQueryRepository.getAllPostsClearQuery(queryParams, userId);
  }

  // async getPostByIdWithLikes(id: string, userId: string) {
  //   return this.postsQueryRepository.queryPostById(id, userId);
  // }

  // async getPostById(id: string | ObjectId) {
  //   return await this.postsQueryRepository.findById(id).exec();
  // }

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
    const post = await this.blogsService.getBlogByIdClearQuery(dto.blogId);
    if (!post) {
      throw new NotFoundException();
    }
    await this.postsQueryRepository.changePost({ id: dto.id, ...dto });
  }
}
