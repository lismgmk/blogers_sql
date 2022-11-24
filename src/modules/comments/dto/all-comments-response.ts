import { likeStatusType } from '../../likes/dto/like-interfaces';

export interface ICommentsRequest {
  id: string;
  content: string;
  userId: string;
  userLogin: string;
  createdAt: string;
  likeInfo: {
    dislikesCount: number;
    likesCount: number;
    myStatus: likeStatusType;
  };
}
