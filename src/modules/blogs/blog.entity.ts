import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  youtube: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.blog)
  @JoinColumn()
  // postId: Relation<Post[]>;
  postId: Post[];
}
