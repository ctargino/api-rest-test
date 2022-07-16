import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '@controllers/UsersController';

const user = Router();
const usersController = new UsersController();

user
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

user.get(
  '/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().email().required(),
    },
  }),
  usersController.get
);

user
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

export default user;
