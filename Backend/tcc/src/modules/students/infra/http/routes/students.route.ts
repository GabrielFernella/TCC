import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

// import uploadConfig from '@config/upload';

import UsersController from '../controllers/StudentsController';
// import UserAvatarController from '../controllers/UserAvatarController';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const studentsRoute = Router();
const usersController = new UsersController();
// const userAvatarController = new UserAvatarController();

// const upload = multer(uploadConfig.multer);

studentsRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

/* usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
); */
export default studentsRoute;
