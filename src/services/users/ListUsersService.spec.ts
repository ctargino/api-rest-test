import UserRepositoryInMemory from '@database/repositories/in-memory/UserRepositoryInMemory';

import ListUsersService from './ListUsersService';

let listUsersService: ListUsersService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('ListUsers', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    listUsersService = new ListUsersService(userRepositoryInMemory);
  });

  it('should be able to list all users', async () => {
    await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    const users = await listUsersService.execute();

    expect(users.length).toBe(1);
  });
});
