import UserRepositoryInMemory from '@database/repositories/in-memory/UserRepositoryInMemory';
import AppError from '@errors/AppError';

import DeleteUserService from './DeleteUserService';

let deleteUSerService: DeleteUserService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('DeleteUser', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    deleteUSerService = new DeleteUserService(userRepositoryInMemory);
  });

  it('should be able to delete a user by userId', async () => {
    const user = await userRepositoryInMemory.create({
      github_username: 'ctargino',
      email: 'c.targino@gmail.com',
      avatar_url: 'https://avatars2.githubusercontent.com/u/62447?v=4',
      name: 'Caio Targino',
    });

    await deleteUSerService.execute(user.user_id);

    const users = await userRepositoryInMemory.list();

    expect(users.length).toBe(1);
    expect(users[0].deleted_at).toBeTruthy();
  });

  it('should not be able to delete a user that does not exist', async () => {
    await expect(deleteUSerService.execute('123')).rejects.toBeInstanceOf(
      AppError
    );
  });
});
