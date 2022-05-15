import { UpdateResult } from 'typeorm';

import Users from '@database/entities/Users';

export interface IUser {
  name: string;
  github_username: string;
  email: string;
  avatar_url: string;
}

export interface IUpdateUser {
  user_id: string;
  name?: string;
  github_username?: string;
  email?: string;
  avatar_url?: string;
}

export interface IGetUser {
  email?: string;
  user_id?: string;
  github_username?: string;
}

export default interface IUsersRepository {
  create(user: IUser): Promise<Users>;
  findOne(data: IGetUser): Promise<Users | undefined>;
  list(): Promise<Users[]>;
  update(user: IUpdateUser): Promise<UpdateResult>;
  delete(user_id: string): Promise<UpdateResult>;
}
