import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from '../blogs/blog.entity';
import { User } from '../users/user.entity';

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

  // @Column()
  @ManyToOne(() => Blog, (blog) => blog.id)
  blog: Blog;

  // @Column()
  @ManyToOne(() => User, (user) => user.id)
  user: User;
}