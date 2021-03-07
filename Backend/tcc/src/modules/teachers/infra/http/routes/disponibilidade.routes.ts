import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/teachers/infra/http/middlewares/ensureAuthenticated';
import DisponibilidadeController from '../controllers/DisponibilidadeController';

const disponibilidadeRouter = Router();
const disponibilidadeController = new DisponibilidadeController();

disponibilidadeRouter.use(ensureAuthenticated);
disponibilidadeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      teacher_id: Joi.string().required(),
      diaSemana: Joi.number().required(),
      horario: Joi.number().required(),
    },
  }),
  disponibilidadeController.create,
);

export default disponibilidadeRouter;
