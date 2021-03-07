import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/teachers/infra/http/middlewares/ensureAuthenticated';
import AvaliacaoController from '../controllers/AvaliacaoController';

const avaliacaoRouter = Router();
const avaliacaoController = new AvaliacaoController();

avaliacaoRouter.use(ensureAuthenticated);
avaliacaoRouter.post(
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
  avaliacaoController.create,
);

export default avaliacaoRouter;
