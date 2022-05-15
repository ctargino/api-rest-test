import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @Column()
  github_username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar_url: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  constructor() {
    if (!this.user_id) {
      this.user_id = uuidv4();
    }
  }
}
