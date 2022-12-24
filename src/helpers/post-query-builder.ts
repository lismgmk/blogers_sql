import { IPostsRequest } from '../modules/posts/dto/all-posts-response';
import { LikeStatusEnum } from './../global-dto/like-status.dto';

export interface IPostQuery {
  shortDescription: string;
  content: string;
  title: string;
  createdAt: string;
  blogId: string;
  id: string;
  blogName: string;
  likeCount: string;
  dislikeCount: string;
  likeInfoUserId: null | string;
  likeInfoCreated: null | string;
  UserStatus: keyof LikeStatusEnum;
  likeInfoUser: string;
}

export const postsQueryBuilder = (dto: IPostQuery[]): IPostsRequest[] => {
  const res = [];
  const helperArr = [];

  dto.forEach((el) => {
    const existIndex = helperArr.indexOf(el.id);
    const post = {
      id: el.id,
      title: el.title,
      shortDescription: el.shortDescription,
      content: el.content,
      blogId: el.blogId,
      blogName: el.blogName,
      createdAt: new Date(el.createdAt).toISOString(),
      extendedLikesInfo: {
        dislikesCount: el.dislikeCount,
        likesCount: el.likeCount,
        myStatus: el.UserStatus,
        newestLikes: el.likeInfoUserId
          ? [
              {
                addedAt: el.likeInfoCreated,
                userId: el.likeInfoUserId,
                login: el.likeInfoUser,
              },
            ]
          : [],
      },
    };

    if (res.length === 0 || existIndex === -1) {
      res.push(post);
      helperArr.push(el.id);
      return;
    } else {
      res[existIndex].extendedLikesInfo.newestLikes.push({
        addedAt: el.likeInfoCreated,
        userId: el.likeInfoUserId,
        login: el.likeInfoUser,
      });
      return;
    }
  });
  return res;
};
