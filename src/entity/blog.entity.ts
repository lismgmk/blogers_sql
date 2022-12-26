import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Blog {
  // @PrimaryGeneratedColumn('uuid')
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  websiteUrl: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.blog)
  @JoinColumn()
  posts: Post[];
}
