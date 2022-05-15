import { inject, injectable } from 'tsyringe';

import Users from '@database/entities/Users';
import IUsersRepository, {
  IGetUser,
} from '@database/repositories/IUserRepository';

@injectable()
export default class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute(data: IGetUser): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne(data);

    return user;
  }
}
