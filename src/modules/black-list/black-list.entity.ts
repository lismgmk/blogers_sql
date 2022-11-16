import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from '../devices/device.entity';
import { User } from '../users/user.entity';

@Entity()
export class BlackList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenValue: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User[];

  @ManyToOne(() => Device, (device) => device.name)
  device: Device[];
}
