import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@errors/AppError';
import CreateUsersService from '@services/users/CreateUsersService';
import DeleteUserService from '@services/users/DeleteUserService';
import GetUserService from '@services/users/GetUserService';
import ListUsersService from '@services/users/ListUsersService';
import UpdateUserService from '@services/users/UpdateUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { githubUserName, email } = request.body;

    const user = await container.resolve(CreateUsersService).execute({
      githubUserName,
      email,
    });

    return response.json(user);
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    const users = await container.resolve(GetUserService).execute({ email });

    if (!users?.user_id) {
      throw new AppError('User not found', 404);
    }

    return response.json(users);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const users = await container.resolve(ListUsersService).execute();

    return response.json(users);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { githubUserName, email } = request.body;

    const userUpdate = await container.resolve(UpdateUserService).execute({
      user_id,
      github_username: githubUserName,
      email,
    });

    return response.json(userUpdate);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    await container.resolve(DeleteUserService).execute(user_id);

    return response.status(202).json({ message: 'User deleted' });
  }
}
