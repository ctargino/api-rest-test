import { inject, injectable } from 'tsyringe';

import Users from '@database/entities/Users';
import IUsersRepository from '@database/repositories/IUserRepository';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute(): Promise<Users[]> {
    return this.usersRepository.list();
  }
}
