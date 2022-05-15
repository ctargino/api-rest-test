import { UpdateResult } from 'typeorm';

import Users from '@database/entities/Users';

import IUsersRepository, {
  IGetUser,
  IUpdateUser,
  IUser,
} from '../IUserRepository';

export default class UserRepositoryInMemory implements IUsersRepository {
  users: Users[] = [];

  async create(user: IUser): Promise<Users> {
    const newUser = new Users();

    Object.assign(newUser, user);

    this.users.push(newUser);

    return newUser;
  }

  async findOne({
    email,
    github_username,
    user_id,
  }: IGetUser): Promise<Users | undefined> {
    let user: Users;

    if (user_id) {
      user = this.users.find(
        (user) => user.user_id === user_id && !user.deleted_at
      );
    }

    if (email) {
      user = this.users.find(
        (user) => user.email === email && !user.deleted_at
      );
    }

    if (github_username) {
      user = this.users.find(
        (user) => user.github_username === github_username && !user.deleted_at
      );
    }

    return user;
  }

  async list(): Promise<Users[]> {
    return this.users;
  }

  async update(user: IUpdateUser): Promise<UpdateResult> {
    const updateUser = await this.findOne({ user_id: user.user_id });

    if (updateUser) {
      Object.assign(updateUser, user);

      return {
        raw: { updateUser },
        affected: 1,
        generatedMaps: [updateUser],
      };
    }

    return {
      raw: { updateUser },
      affected: 0,
      generatedMaps: [updateUser],
    };
  }

  async delete(user_id: string): Promise<UpdateResult> {
    const deleteUser = await this.findOne({ user_id });

    if (deleteUser) {
      Object.assign(deleteUser, { deleted_at: new Date() });

      return {
        raw: { deleteUser },
        affected: 1,
        generatedMaps: [deleteUser],
      };
    }

    return {
      raw: { deleteUser },
      affected: 0,
      generatedMaps: [deleteUser],
    };
  }
}
