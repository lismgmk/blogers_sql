import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostComment } from './comment.entity';
import { Device } from './device.entity';
import { Like } from './like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

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

  @OneToMany(() => PostComment, (comment) => comment.user, {
    onDelete: 'CASCADE',
  })
  comments: PostComment[];

  @OneToMany(() => Like, (like) => like.user)
  @JoinColumn()
  likes: Like[];

  @ManyToMany(() => Device, (device) => device.users)
  @JoinTable()
  devices: Device[];
}
