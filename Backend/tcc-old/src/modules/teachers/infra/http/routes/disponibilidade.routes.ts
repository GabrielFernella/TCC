import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/teachers/infra/http/middlewares/ensureAuthenticated';
import DisponibilidadeController from '../controllers/DisponibilidadeController';

const disponibilidadeRouter = Router();
const disponibilidadeController = new DisponibilidadeController();

disponibilidadeRouter.use(ensureAuthenticated);
disponibilidadeRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  disponibilidadeController.show,
);
disponibilidadeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      teacher_id: Joi.string().required(),
      diaSemana: Joi.number().required(),
      horarioentrada: Joi.number().required(),
      horariosaida: Joi.number().required(),
    },
  }),
  disponibilidadeController.create,
);
disponibilidadeRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  disponibilidadeController.delete,
);

export default disponibilidadeRouter;
