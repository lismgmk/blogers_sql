import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToMany(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User[];
}
