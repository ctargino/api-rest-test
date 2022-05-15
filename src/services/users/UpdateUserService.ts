import { inject, injectable } from 'tsyringe';

import Users from '@database/entities/Users';
import IUsersRepository, {
  IUpdateUser,
} from '@database/repositories/IUserRepository';
import AppError from '@errors/AppError';
import GetGithubUserByUserNameService from '@services/github/GetGithubUserByUserNameService';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({
    user_id,
    github_username,
    email,
  }: IUpdateUser): Promise<Users> {
    const findUser = await this.usersRepository.findOne({ user_id });

    if (!findUser?.user_id) {
      throw new AppError('User not found', 404);
    }

    if (github_username) {
      const githubUser = await GetGithubUserByUserNameService(github_username);
      await this.usersRepository.update({
        user_id,
        github_username: githubUser.login,
        name: githubUser.name,
        email: githubUser.email || email || findUser.email,
        avatar_url: githubUser.avatar_url,
      });
    } else {
      await this.usersRepository.update({
        user_id,
        email,
      });
    }

    return this.usersRepository.findOne({ user_id });
  }
}
