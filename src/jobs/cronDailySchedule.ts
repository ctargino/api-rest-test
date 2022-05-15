/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { container } from 'tsyringe';

import { sendEmailService } from '@services/email/SendEmailService';
import ListUsersService from '@services/users/ListUsersService';

async function executeDailyJobs() {
  console.log('Ran daily job - ', new Date());
  const users = await container.resolve(ListUsersService).execute();

  await sendEmailService(users.map((user) => user.email));
}

export { executeDailyJobs };
