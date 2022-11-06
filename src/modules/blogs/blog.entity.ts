import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  youtubeUrl: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.blogId)
  @JoinColumn()
  postId: Relation<Post[]>;
}
