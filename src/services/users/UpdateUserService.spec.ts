import UserRepositoryInMemory from '@database/repositories/in-memory/UserRepositoryInMemory';
import AppError from '@errors/AppError';

import UpdateUserService from './UpdateUserService';

let updateUserService: UpdateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('UpdateUser', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    updateUserService = new UpdateUserService(userRepositoryInMemory);
  });

  it('should be able to update a user by userId', async () => {
    const user = await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    await updateUserService.execute({
      user_id: user.user_id,
      email: 'jhon@doe.com',
    });

    const findUser = await userRepositoryInMemory.findOne({
      user_id: user.user_id,
    });

    expect(findUser.email).toBe('jhon@doe.com');
  });

  it('should be able to update a user githubName', async () => {
    const user = await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    await updateUserService.execute({
      user_id: user.user_id,
      github_username: 'luizmo',
    });

    const findUser = await userRepositoryInMemory.findOne({
      user_id: user.user_id,
    });

    expect(findUser.github_username).toBe('luizmo');
  });

  it("shouldn't be able to update a user that does not exist", async () => {
    await expect(
      updateUserService.execute({
        user_id: '123',
        email: 'c.targino@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
