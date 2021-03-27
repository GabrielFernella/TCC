import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/professor/infra/http/middlewares/ensureAuthenticated';
import DisponibilidadeController from '../controllers/DisponibilidadeController';

const disponibilidadeRouter = Router();
const disponibilidadeController = new DisponibilidadeController();

disponibilidadeRouter.use(ensureAuthenticated);

// Mostra a disponibilidade do professor
disponibilidadeRouter.get(
  '/show',
  celebrate({
    [Segments.BODY]: {
      professor_id: Joi.string().required(),
    },
  }),
  disponibilidadeController.show,
);
disponibilidadeRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
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
