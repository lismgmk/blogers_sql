import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CheckIpAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  path: string;

  @Column()
  ip: string;

  @CreateDateColumn()
  createdAt: Date;
}
