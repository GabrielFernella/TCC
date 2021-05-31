import { Router } from 'express';
// import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

// import uploadConfig from '@config/upload';

import AlunoController from '../controllers/AlunoController';
// import UserAvatarController from '../controllers/UserAvatarController';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const alunoRoute = Router();
const alunoController = new AlunoController();
// const userAvatarController = new UserAvatarController();

// const upload = multer(uploadConfig.multer);

alunoRoute.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      avatar: Joi.string().required(),
      pix: Joi.string().required(),
    },
  }),
  alunoController.create,
);

alunoRoute.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      avatar: Joi.string().required(),
      pix: Joi.string().required(),
    },
  }),
  alunoController.update,
);

/* usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
); */
export default alunoRoute;
