import { getRepository, Repository, UpdateResult } from 'typeorm';

import Users from '@database/entities/Users';

import IUsersRepository, {
  IGetUser,
  IUpdateUser,
  IUser,
} from './IUserRepository';

export default class UserRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;
  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async create(user: IUser): Promise<Users> {
    const newUser = this.ormRepository.create(user);
    return this.ormRepository.save(newUser);
  }

  public async findOne(data: IGetUser): Promise<Users | undefined> {
    return this.ormRepository.findOne({ where: data });
  }

  public async update(user: IUpdateUser): Promise<UpdateResult> {
    const { user_id, ...userData } = user;
    return this.ormRepository.update(user_id, userData);
  }

  public async list(): Promise<Users[]> {
    return this.ormRepository.find();
  }

  public async delete(user_id: string): Promise<UpdateResult> {
    return this.ormRepository.softDelete(user_id);
  }
}
