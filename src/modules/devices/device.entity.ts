import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlackList } from '../black-list/black-list.entity';
import { User } from '../users/user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  ip: string;

  @Column()
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  expiredAt: Date;

  @ManyToMany(() => User, (user) => user.id)
  user: User[];
}
