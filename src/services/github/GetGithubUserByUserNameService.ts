import axios from 'axios';

import AppError from '@errors/AppError';

interface IGithubUser {
  login: string;
  avatar_url: string;
  email: string;
  name: string;
}

export default async (githubUserName: string): Promise<IGithubUser> => {
  return axios({
    method: 'GET',
    url: `https://api.github.com/users/${githubUserName}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new AppError(error.response.statusText, error.response.status);
    });
};
