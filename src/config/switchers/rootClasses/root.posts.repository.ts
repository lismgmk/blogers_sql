import { Injectable } from '@nestjs/common';
import { Post } from '../../../entity/post.entity';
import { IPostQuery } from '../../../helpers/post-query-builder';
import { CreatePostWithBlogIdDto } from '../../../modules/posts/dto/create-post-with-blog-id.dto';
import { GetAllPostsdDto } from '../../../modules/posts/dto/get-all-posts.dto';

@Injectable()
export class RootPostsRepository {
  constructor() {}
  async getAllPostsClearQuery(
    dto: GetAllPostsdDto & { userId: string; blogId?: string; offset: number },
  ): Promise<IPostQuery[]> {
    return;
  }

  async getCountPosts(blogId: string = null) {
    return;
  }

  async createPost(dto: CreatePostWithBlogIdDto): Promise<Post> {
    return;
  }

  async getPostByIdWithLikes(dto: {
    id: string;
    userId: string;
  }): Promise<IPostQuery[]> {
    return;
  }

  async getPostById(id: string): Promise<Post> {
    return;
  }

  async changePost(dto: CreatePostWithBlogIdDto & { id: string }) {
    return;
  }

  async deletePostById(id: string) {
    return;
  }
}
