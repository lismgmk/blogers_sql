import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from '../devices/device.entity';
import { Like } from '../likes/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
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

  @ManyToMany(() => Device, (device) => device.id, { onDelete: 'CASCADE' })
  @JoinTable()
  device: Device[];

  @OneToMany(() => Like, (like) => like.id)
  @JoinColumn()
  likeId: Like[];
}
