import { ICommentsRequest } from '../modules/comments/dto/all-comments-response';
import { likeStatusType } from '../modules/likes/dto/like-interfaces';

export interface ICommentQuery {
  userId: string;
  content: string;
  created_at: string;
  id: string;
  likeCount: string;
  dislikeCount: string;
  UserStatus: likeStatusType;
  UserName: string;
}

export const commentsQueryBuilder = (
  dto: ICommentQuery[],
): ICommentsRequest[] => {
  return dto.map((el) => ({
    id: el.id,
    content: el.content,
    userId: el.userId,
    userName: el.UserName,
    createdAt: new Date(el.created_at).toISOString(),
    likeInfo: {
      dislikesCount: Number(el.likeCount),
      likesCount: Number(el.dislikeCount),
      myStatus: el.UserStatus,
    },
  }));
};
