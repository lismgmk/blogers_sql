import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from '../devices/device.entity';
import { User } from '../users/user.entity';

@Entity()
export class BlackList {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  tokenValue: string;
}
