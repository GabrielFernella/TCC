import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/professor/infra/http/middlewares/ensureAuthenticated';
import DisciplinaController from '../controllers/DisciplinaController';

const aulaRouter = Router();
const disciplinaController = new DisciplinaController();

aulaRouter.use(ensureAuthenticated);
aulaRouter.post(
  // Create
  '/',
  celebrate({
    [Segments.BODY]: {
      professor_id: Joi.string().required(),
      tittle: Joi.string().required(),
      tag: Joi.array().required(), // pode ser um array de string
      description: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  disciplinaController.create,
);

export default aulaRouter;
