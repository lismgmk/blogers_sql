import { Injectable } from '@nestjs/common';
import { RootLikesRepository } from '../../config/switchers/rootClasses/root.likes.repository';
import { ILikeInfo } from './dto/create-like.interface';

@Injectable()
export class LikesService {
  constructor(private rootLikesRepository: RootLikesRepository) {}

  async upDateLikesInfo(dto: ILikeInfo) {
    if (dto.postId) {
      const existEnt = await this.rootLikesRepository.getLikePost(dto.postId);
      return existEnt
        ? await this.rootLikesRepository.changeLikeStatusPost({
            status: dto.status,
            postId: dto.postId,
            userId: dto.userId,
          })
        : await this.rootLikesRepository.createLikeForPost({
            status: dto.status,
            postId: dto.postId,
            userId: dto.userId,
          });
    } else {
      const existEnt = await this.rootLikesRepository.getLikeCommentPost(
        dto.commentId,
      );
      return existEnt
        ? await this.rootLikesRepository.changeLikeStatusComment({
            status: dto.status,
            commentId: dto.commentId,
            userId: dto.userId,
          })
        : await this.rootLikesRepository.createLikeForComment({
            status: dto.status,
            commentId: dto.commentId,
            userId: dto.userId,
          });
    }
  }
}
