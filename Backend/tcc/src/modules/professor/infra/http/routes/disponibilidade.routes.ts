import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/professor/infra/http/middlewares/ensureAuthenticated';
import DisponibilidadeController from '../controllers/DisponibilidadeController';

const disponibilidadeRouter = Router();
const disponibilidadeController = new DisponibilidadeController();

// Mostra a disponibilidade do professor
disponibilidadeRouter.get(
  '/show',

  disponibilidadeController.show,
);

disponibilidadeRouter.use(ensureAuthenticated);

disponibilidadeRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      diaSemana: Joi.string().required(),
      horarioEntrada: Joi.number().required(),
      horarioSaida: Joi.number().required(),
    },
  }),
  disponibilidadeController.create,
);
disponibilidadeRouter.delete(
  '/delete',
  celebrate({
    [Segments.BODY]: {
      disponibilidade_id: Joi.string().required(),
    },
  }),
  disponibilidadeController.delete,
);

export default disponibilidadeRouter;
