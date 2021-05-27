import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/agendamento/infra/http/middlewares/ensureAuthenticated';
import SessionsController from '../controllers/SessionsController';

const AuthRouter = Router();
const sessionsController = new SessionsController();

AuthRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

AuthRouter.use(ensureAuthenticated);

AuthRouter.get('/', sessionsController.getToken);

export default AuthRouter;
