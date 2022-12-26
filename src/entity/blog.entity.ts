import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
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
