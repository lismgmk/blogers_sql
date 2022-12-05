import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column()
  createdAt: Date;

  @ManyToOne(() => Blog, (blog) => blog.id, { onDelete: 'CASCADE' })
  blog: Blog;

  @OneToMany(() => Like, (like) => like.id)
  @JoinColumn()
  likeId: Like[];
}
