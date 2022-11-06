import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from 'typeorm';
import { Blog } from '../blogs/blog.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortDescription: string;

  @Column()
  content: string;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @Column()
  @ManyToOne(() => Blog, (blog) => blog.id)
  blogId: Relation<Blog>;
}
