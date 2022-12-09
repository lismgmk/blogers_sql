import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from '../../entity/post.entity';
import { LikeInfoRequest } from '../../global-dto/like-info.request';
import { PostsQueryRepository } from '../posts/postsClearQuert.repositiry';
import { PostsService } from './../posts/posts.service';
import { CommentsQueryRepository } from './commentsQuert.repositiry';
import { ICreateComment } from './dto/comments-interfaces';
import { GetAllCommentsDto } from './dto/get-all-comments.dto';
import { ICommentById } from './dto/get-comment-by-id.interface';

@Injectable()
export class CommentsService {
  constructor(
    private commentsClearQueryRepository: CommentsQueryRepository,
    private postsQueryRepository: PostsQueryRepository,
    private postsService: PostsService,
  ) {}

  async getCommentByIdWithLikes(dto: ICommentById) {
    await this.checkExistComment(dto.id);
    return this.commentsClearQueryRepository.getCommentsByPostIdWithLikes(dto);
  }

  async getCommentsForPostId(
    dto: GetAllCommentsDto & { postId: string; userId: string },
  ) {
    await this.postsService.checkExistPost(dto.postId);
    return this.commentsClearQueryRepository.getAllCommentsByPostId(dto);
  }

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
    // if (comment.userId.equals(userId)) {
    if (comment.userId !== userId) {
      throw new ForbiddenException();
    }
  }

  async checkExistComment(id: string) {
    const comment = await this.commentsClearQueryRepository.getCommentById(id);
    if (!comment) {
      throw new NotFoundException();
    }
  }
}
