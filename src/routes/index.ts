import { Router } from 'express';

import StatusController from '@controllers/StatusController';

import userRouter from './user.routes';

const routes = Router();

routes.use('/users', userRouter);

routes.use('/status', StatusController.status);
routes.use('/ready', StatusController.ready);

export default routes;
