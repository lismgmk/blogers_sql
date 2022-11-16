import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  passwordHash: string;

  @Column({
    nullable: true,
  })
  confirmationCode: string;

  @Column()
  isConfirmed: boolean;

  @OneToMany(() => Post, (post) => post.user)
  postId: Post[];
}
