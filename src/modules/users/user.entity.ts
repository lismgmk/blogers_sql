import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from '../devices/device.entity';
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
  confirmationCode: Date;

  @Column()
  isConfirmed: boolean;

  @OneToMany(() => Post, (post) => post.user)
  postId: Post[];

  @ManyToMany(() => Device, (device) => device.id)
  device: Device[];
}