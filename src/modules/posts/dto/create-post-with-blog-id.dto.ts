import { CreatePostDto } from './create-post.dto';

export class CreatePostWithBlogIdDto extends CreatePostDto {
  readonly blogId: string;
}
