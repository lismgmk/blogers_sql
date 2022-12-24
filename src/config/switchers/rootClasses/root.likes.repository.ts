import { Injectable } from '@nestjs/common';
import { Like } from '../../../entity/like.entity';
import { ILikeInfo } from '../../../modules/likes/dto/create-like.interface';

@Injectable()
export class RootLikesRepository {
  constructor() {}
  async getLikePost(postId: string): Promise<Like> {
    return;
  }

  async getLikeCommentPost(commentId: string): Promise<Like> {
    return;
  }

  async createLikeForPost(dto: Omit<ILikeInfo, 'commentId'>): Promise<Like> {
    return;
  }

  async changeLikeStatusPost(dto: Omit<ILikeInfo, 'commentId'>) {
    return;
  }

  async createLikeForComment(dto: Omit<ILikeInfo, 'postId'>): Promise<Like> {
    return;
  }

  async changeLikeStatusComment(dto: Omit<ILikeInfo, 'postId'>) {
    return;
  }
}
