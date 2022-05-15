import { container } from 'tsyringe';

import IUsersRepository from '@database/repositories/IUserRepository';
import UserRepository from '@database/repositories/UserRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository
);
