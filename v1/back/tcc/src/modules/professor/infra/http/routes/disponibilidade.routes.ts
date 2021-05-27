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
      diaSemana: Joi.number().required(),
      horarioEntrada: Joi.number().required(),
      horarioSaida: Joi.number().required(),
    },
  }),
  disponibilidadeController.create,
);
disponibilidadeRouter.delete(
  '/delete/:disponibilidade_id',
  celebrate({
    [Segments.PARAMS]: {
      disponibilidade_id: Joi.string().uuid().required(),
    },
  }),
  disponibilidadeController.delete,
);

export default disponibilidadeRouter;
