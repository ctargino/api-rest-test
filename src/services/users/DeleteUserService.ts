import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@database/repositories/IUserRepository';
import AppError from '@errors/AppError';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ user_id });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.usersRepository.delete(user_id);
  }
}
