import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '@controllers/UsersController';

const userRouter = Router();
const usersController = new UsersController();

userRouter
  .route('/')
  .post(
    celebrate({
      [Segments.BODY]: {
        githubUserName: Joi.string().required(),
        email: Joi.string().email(),
      },
    }),
    usersController.create
  )
  .get(usersController.list);

userRouter.get(
  '/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().email().required(),
    },
  }),
  usersController.get
);

userRouter
  .route('/:user_id')
  .put(
    celebrate({
      [Segments.PARAMS]: {
        user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      },
      [Segments.BODY]: {
        githubUserName: Joi.string(),
        email: Joi.string().email(),
      },
    }),
    usersController.update
  )
  .delete(
    celebrate({
      [Segments.PARAMS]: {
        user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      },
    }),
    usersController.delete
  );

export default userRouter;
