import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/teachers/infra/http/middlewares/ensureAuthenticated';
import AulaController from '../controllers/AulaController';

const aulaRouter = Router();
const aulaController = new AulaController();

aulaRouter.use(ensureAuthenticated);
aulaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      teacher_id: Joi.string().required(),
      tittle: Joi.string().required(),
      tag: Joi.array().required(), // pode ser um array de string
      description: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  aulaController.create,
);

export default aulaRouter;
