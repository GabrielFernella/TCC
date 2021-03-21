import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

// import uploadConfig from '@config/upload';

import ProfessorController from '../controllers/ProfessorController';
// import UserAvatarController from '../controllers/UserAvatarController';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const professorRouter = Router();
const professorController = new ProfessorController();
// const userAvatarController = new UserAvatarController();

// const upload = multer(uploadConfig.multer);

professorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      avatar: Joi.string().required(),
      pix: Joi.string().required(),
      bio: Joi.string().required(),
    },
  }),
  professorController.create,
);

/* usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
); */
export default professorRouter;
