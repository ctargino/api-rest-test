import UserRepositoryInMemory from '@database/repositories/in-memory/UserRepositoryInMemory';
import AppError from '@errors/AppError';

import CreateUsersService from './CreateUsersService';

let createUsersService: CreateUsersService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('CreateUsers', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUsersService = new CreateUsersService(userRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUsersService.execute({
      githubUserName: 'ctargino',
      email: 'c.targino@gmail.com',
    });

    expect(user).toHaveProperty('user_id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    await expect(
      createUsersService.execute({
        githubUserName: 'luizmo',
        email: 'c.targino@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with same github username from another', async () => {
    await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    await expect(
      createUsersService.execute({
        githubUserName: 'ctargino',
        email: 'email@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should throw an error if github user doesn't have email and no email was provided", async () => {
    await expect(
      createUsersService.execute({
        githubUserName: 'ctargino',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
