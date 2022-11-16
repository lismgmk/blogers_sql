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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ip: string;

  @Column()
  createdAt: Date;

  @Column()
  expireddAt: Date;

  @ManyToMany(() => User, (user) => user.id)
  user: User[];

  @OneToMany(() => BlackList, (list) => list.device)
  list: BlackList[];
}
