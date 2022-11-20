import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from '../devices/device.entity';

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

  @ManyToMany(() => Device, (device) => device.id)
  @JoinTable()
  device: Device[];
}
