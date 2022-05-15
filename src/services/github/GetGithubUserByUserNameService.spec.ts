import AppError from '@errors/AppError';

import GetGithubUserByUserNameService from './GetGithubUserByUserNameService';

describe('GetGithubUserByUserName', () => {
  it('should be able to get a github user by username', async () => {
    const githubUser = await GetGithubUserByUserNameService('ctargino');

    expect(githubUser).toHaveProperty('avatar_url');
    expect(githubUser).toHaveProperty('name');
    expect(githubUser.login).toBe('ctargino');
  });

  it('should throw an error if github user not found', async () => {
    await expect(
      GetGithubUserByUserNameService('ctarginohduiash12')
    ).rejects.toBeInstanceOf(AppError);
  });
});
