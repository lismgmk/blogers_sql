import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostComment } from '../comments/comment.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => PostComment, (comment) => comment.id)
  comment: PostComment;
}
