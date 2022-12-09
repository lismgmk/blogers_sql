import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostComment } from './comment.entity';
import { Post } from './post.entity';

import { User } from './user.entity';

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

  @ManyToOne(() => Post, (post) => post.id, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => PostComment, (comment) => comment.id, {
    onDelete: 'CASCADE',
  })
  comment: PostComment;
}
