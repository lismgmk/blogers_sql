import { LikeStatusEnum } from '../../../global-dto/like-status.dto';

export interface ILikeInfo {
  postId?: string;
  commentId?: string;
  status: keyof typeof LikeStatusEnum;
  userId: string;
}
