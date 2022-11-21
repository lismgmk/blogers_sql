import { Injectable } from '@nestjs/common';
import { ILikeInfo } from './dto/create-like.interface';
import { LikesRepository } from './likes.repository';

@Injectable()
export class LikesService {
  constructor(private likesRepository: LikesRepository) {}

  async upDateLikesInfo(dto: ILikeInfo) {
    if (dto.postId) {
      const existEnt = await this.likesRepository.getLikePost(dto.postId);
      return existEnt
        ? await this.likesRepository.changeLikeStatusPost({
            status: dto.status,
            postId: dto.postId,
            userId: dto.userId,
          })
        : await this.likesRepository.createLikeForPost({
            status: dto.status,
            postId: dto.postId,
            userId: dto.userId,
          });
    } else {
      const existEnt = this.likesRepository.getLikeCommentPost(dto.commentId);
      return existEnt
        ? await this.likesRepository.changeLikeStatusComment({
            status: dto.status,
            commentId: dto.commentId,
            userId: dto.userId,
          })
        : await this.likesRepository.createLikeForComment({
            status: dto.status,
            commentId: dto.commentId,
            userId: dto.userId,
          });
    }
  }
}
