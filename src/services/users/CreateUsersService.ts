import { inject, injectable } from 'tsyringe';

import Users from '@database/entities/Users';
import IUsersRepository from '@database/repositories/IUserRepository';
import AppError from '@errors/AppError';
import GetGithubUserByUserNameService from '@services/github/GetGithubUserByUserNameService';

interface IUser {
  githubUserName: string;
  email?: string;
}

@injectable()
export default class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute(user: IUser): Promise<Users> {
    const userGithubExists = await this.usersRepository.findOne({
      github_username: user.githubUserName,
    });

    if (userGithubExists) {
      throw new AppError('User already exists', 400);
    }

    const userEmailExists = await this.usersRepository.findOne({
      email: user.email,
    });

    if (userEmailExists) {
      throw new AppError('User already exists', 400);
    }

    const githubUser = await GetGithubUserByUserNameService(
      user.githubUserName
    );

    if (!githubUser?.email && !user.email) {
      throw new AppError(
        'This github user has no email, please enter the github username and a valid email',
        400
      );
    }

    return this.usersRepository.create({
      github_username: githubUser.login,
      name: githubUser.name,
      email: githubUser.email || user.email,
      avatar_url: githubUser.avatar_url,
    });
  }
}
