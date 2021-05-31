import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

// import uploadConfig from '@config/upload';

import ProfessorController from '../controllers/ProfessorController';
import ResetPasswordController from '../controllers/ResetPasswordController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const professorRouter = Router();
const professorController = new ProfessorController();
const resetPasswordController = new ResetPasswordController();

// const upload = multer(uploadConfig.multer);
// '/find/:disciplina_id',
professorRouter.get(
  '/show/:professor_id',
  celebrate({
    [Segments.PARAMS]: {
      professor_id: Joi.string().required(),
    },
  }),
  professorController.show,
);

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

professorRouter.use(ensureAuthenticated);

professorRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

professorRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      avatar: Joi.string().required(),
      pix: Joi.string().required(),
      biografia: Joi.string().required(),
    },
  }),
  professorController.update,
);

/* usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
); */
export default professorRouter;
