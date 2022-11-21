import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikeInfoRequest } from '../../global-dto/like-info.request';
import { CreatePostWithBlogIdDto } from '../posts/dto/create-post-with-blog-id.dto';
import { Post } from '../posts/post.entity';
import { PostsQueryRepository } from '../posts/postsClearQuert.repositiry';
import { UsersService } from '../users/users.service';
import { CommentsQueryRepository } from './commentsQuert.repositiry';
import { ICreateComment } from './dto/comments-interfaces';

@Injectable()
export class CommentsService {
  constructor(
    private commentsClearQueryRepository: CommentsQueryRepository,
    private postsQueryRepository: PostsQueryRepository,
  ) {}
  //   async getAllPosts(queryParams: GetAllPostsdDto, userId: string) {
  //     return this.postsQueryRepository.queryAllPostsPagination(
  //       queryParams,
  //       null,
  //       userId,
  //     );
  //   }
  //   async getPostByIdWithLikes(id: string, userId: string) {
  //     return this.postsQueryRepository.queryPostById(id, userId);
  //   }
  //   async getPostById(id: string | ObjectId) {
  //     return await this.postModel.findById(id).exec();
  //   }

  async createComment(dto: ICreateComment) {
    const currentPost = (await this.postsQueryRepository.getPostById(
      dto.postId,
    )) as Post;
    if (!currentPost) {
      throw new BadRequestException({
        message: { message: 'post does not found', field: 'postId' },
      });
    }
    const newComment = {
      content: dto.content,
      userId: dto.userId,
      postId: dto.postId,
    };
    const createdComment =
      await this.commentsClearQueryRepository.createComment(newComment);

    const likesInfo: LikeInfoRequest = {
      likesCount: 0,
      dislikesCount: 0,
      myStatus: 'None',
    };
    return {
      id: createdComment.id,
      content: createdComment.content,
      userId: createdComment.userId,
      userLogin: dto.userLogin,
      createdAt: createdComment.createdAt,
      likesInfo,
    };
  }

  async changeComment(id: string, content: string, userId: string) {
    await this.checkOwner(id, userId);
    await this.commentsClearQueryRepository.changeComment(id, content);
  }

  async deleteComment(id: string, userId: string) {
    await this.checkOwner(id, userId);
    await this.commentsClearQueryRepository.deleteCommentById(id);
  }

  async checkOwner(id: string, userId: string) {
    const comment = await this.commentsClearQueryRepository.getCommentById(id);
    if (!comment.userId.equals(userId)) {
      throw new ForbiddenException();
    }
  }
}
