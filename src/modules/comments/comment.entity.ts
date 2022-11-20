import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from '../likes/like.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => Like, (like) => like.id)
  @JoinColumn()
  likeId: Like[];
}
