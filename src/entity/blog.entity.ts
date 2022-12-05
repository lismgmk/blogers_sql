import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  youtube: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.blog)
  @JoinColumn()
  postId: Post[];
}
