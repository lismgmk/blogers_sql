import { PostComment } from './comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from './blog.entity';
import { Like } from './like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  shortDescription: string;

  @Column()
  content: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PostComment, (comment) => comment.post, {
    onDelete: 'CASCADE',
  })
  comments: PostComment[];

  @OneToMany(() => Like, (like) => like.post)
  @JoinColumn()
  likes: Like[];

  @ManyToOne(() => Blog, (blog) => blog.posts, { onDelete: 'CASCADE' })
  blog: Blog;
}
