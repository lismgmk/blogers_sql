import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RootCommentsRepository } from '../../config/switchers/rootClasses/root.comments.repository';
import { LikeInfoRequest } from '../../global-dto/like-info.request';
import { commentsQueryBuilder } from '../../helpers/comment-query-builder';
import { paginationBuilder } from '../../helpers/pagination-builder';
import { PostsService } from './../posts/posts.service';
import { ICreateComment } from './dto/comments-interfaces';
import { GetAllCommentsDto } from './dto/get-all-comments.dto';
import { ICommentById } from './dto/get-comment-by-id.interface';

@Injectable()
export class CommentsService {
  constructor(
    private rootCommentsRepository: RootCommentsRepository,
    private postsService: PostsService,
  ) {}

  async getCommentByIdWithLikes(dto: ICommentById) {
    await this.checkExistComment(dto.id);
    const comment =
      await this.rootCommentsRepository.getCommentsByPostIdWithLikes(dto);
    return commentsQueryBuilder(comment)[0];
  }

  async getCommentsForPostId(
    dto: GetAllCommentsDto & { postId: string; userId: string },
  ) {
    await this.postsService.checkExistPost(dto.postId);
    const offset =
      dto.pageNumber === 1 ? 0 : (dto.pageNumber - 1) * dto.pageSize;
    const allRows = await this.rootCommentsRepository.getCountRows(dto.postId);

    const allCommentsQuery =
      await this.rootCommentsRepository.getAllCommentsByPostId({
        ...dto,
        offset,
      });

    return {
      ...paginationBuilder({
        totalCount: Number(allRows[0].count),
        pageSize: dto.pageSize,
        pageNumber: dto.pageNumber,
      }),
      items: commentsQueryBuilder(allCommentsQuery),
    };
  }

  async createComment(dto: ICreateComment) {
    const currentPost = await this.postsService.getPostById({
      id: dto.postId,
      userId: dto.userId,
    });
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
    const createdComment = await this.rootCommentsRepository.createComment(
      newComment,
    );

    const likesInfo: LikeInfoRequest = {
      likesCount: 0,
      dislikesCount: 0,
      myStatus: 'None',
    };
    return {
      id: createdComment.id,
      content: createdComment.content,
      userId: dto.userId,
      userLogin: dto.userLogin,
      createdAt: createdComment.created_at,
      likesInfo,
    };
  }

  async changeComment(id: string, content: string, userId: string) {
    await this.checkOwner(id, userId);
    await this.rootCommentsRepository.changeComment(id, content);
  }

  async deleteComment(id: string, userId: string) {
    await this.checkOwner(id, userId);
    await this.rootCommentsRepository.deleteCommentById(id);
  }

  async checkOwner(id: string, userId: string) {
    const comment = await this.rootCommentsRepository.getCommentById(id);
    if (comment.user.id !== userId) {
      throw new ForbiddenException();
    }
  }

  async checkExistComment(id: string) {
    const comment = await this.rootCommentsRepository.getCommentById(id);
    if (!comment) {
      throw new NotFoundException();
    }
  }
}
