import { Injectable } from '@nestjs/common';
import { PostComment } from '../../../entity/comment.entity';
import { ICommentQuery } from '../../../helpers/comment-query-builder';
import { ICreateComment } from '../../../modules/comments/dto/comments-interfaces';
import { GetAllCommentsDto } from '../../../modules/comments/dto/get-all-comments.dto';
import { ICommentById } from '../../../modules/comments/dto/get-comment-by-id.interface';

@Injectable()
export class RootCommentsRepository {
  constructor() {}

  async getCountRows(id: string) {
    return;
  }

  async getAllCommentsByPostId(
    dto: GetAllCommentsDto & { postId: string; userId: string; offset: number },
  ): Promise<ICommentQuery[]> {
    return;
  }

  async getCommentsByPostIdWithLikes(
    dto: ICommentById,
  ): Promise<ICommentQuery[]> {
    return;
  }

  async createComment(
    dto: Omit<ICreateComment, 'userLogin'>,
  ): Promise<PostComment> {
    return;
  }

  async getCommentById(id: string): Promise<PostComment> {
    return;
  }

  async changeComment(id: string, content: string) {
    return;
  }

  async deleteCommentById(id: string) {
    return;
  }
}
