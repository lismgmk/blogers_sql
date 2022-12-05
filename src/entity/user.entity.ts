import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from './device.entity';
import { Like } from './like.entity';

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

  // @ManyToMany(() => Device, (device) => device.id, { onDelete: 'CASCADE' })
  @ManyToMany(() => Device, (device) => device.id)
  @JoinTable()
  device: Device[];

  @OneToMany(() => Like, (like) => like.id)
  @JoinColumn()
  likeId: Like[];
}