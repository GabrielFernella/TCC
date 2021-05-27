import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

// import uploadConfig from '@config/upload';

import ProfessorController from '../controllers/ProfessorController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const professorRouter = Router();
const professorController = new ProfessorController();

// const upload = multer(uploadConfig.multer);

professorRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      avatar: Joi.string().required(),
      pix: Joi.string().required(),
      biografia: Joi.string().required(),
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
