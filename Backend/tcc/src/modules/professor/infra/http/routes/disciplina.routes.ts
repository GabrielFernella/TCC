import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/professor/infra/http/middlewares/ensureAuthenticated';
import DisciplinaController from '../controllers/DisciplinaController';

const disciplinaRouter = Router();
const disciplinaController = new DisciplinaController();

disciplinaRouter.use(ensureAuthenticated);
disciplinaRouter.post(
  // Create
  '/',
  celebrate({
    [Segments.BODY]: {
      professor_id: Joi.string().required(),
      titulo: Joi.string().required(),
      tag: Joi.array().required(), // pode ser um array de string
      descricao: Joi.string().required(),
      valor: Joi.number().required(),
    },
  }),
  disciplinaController.create,
);

export default disciplinaRouter;

/*
professor_id
titulo
tag
descricao
valor
qtdAvaliacao
mediaAvaliacao
*/
