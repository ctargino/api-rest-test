import UserRepositoryInMemory from '@database/repositories/in-memory/UserRepositoryInMemory';

import GetUserService from './GetUserService';

let getUserService: GetUserService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('GetUser', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    getUserService = new GetUserService(userRepositoryInMemory);
  });

  it('should be able to get a user by email', async () => {
    const user = await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    const findUser = await getUserService.execute({
      email: 'c.targino@gmail.com',
    });

    expect(findUser.user_id).toBe(user.user_id);
  });

  it('should be able to get a user by userId', async () => {
    const user = await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    const findUser = await getUserService.execute({
      user_id: user.user_id,
    });

    expect(findUser.user_id).toBe(user.user_id);
  });

  it('should be able to get a user by githubUserName', async () => {
    const user = await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    const findUser = await getUserService.execute({
      github_username: user.github_username,
    });

    expect(findUser.user_id).toBe(user.user_id);
  });

  it('should return undefined if user not found', async () => {
    const findUser = await getUserService.execute({
      email: 'c.targino@gmail.com',
    });

    expect(findUser).toBeUndefined();
  });
});
