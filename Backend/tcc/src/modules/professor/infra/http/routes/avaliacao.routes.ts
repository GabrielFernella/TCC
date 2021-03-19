import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/teachers/infra/http/middlewares/ensureAuthenticated';
import AvaliacaoController from '../controllers/AvaliacaoController';

const avaliacaoRouter = Router();
const avaliacaoController = new AvaliacaoController();

avaliacaoRouter.use(ensureAuthenticated);

avaliacaoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  avaliacaoController.show,
);

avaliacaoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      teacher_id: Joi.string().required(),
      qtdaulas: Joi.number().required(),
      qtdavaliacao: Joi.number().required(),
      opinion: Joi.string().required(),
    },
  }),
  avaliacaoController.create,
);

avaliacaoRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      teacher_id: Joi.string().required(),
      qtdaulas: Joi.number().required(),
      qtdavaliacao: Joi.number().required(),
      opinion: Joi.string(),
    },
  }),
  avaliacaoController.update,
);

avaliacaoRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  avaliacaoController.delete,
);

export default avaliacaoRouter;
