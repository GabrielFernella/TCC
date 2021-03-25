import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/professor/infra/http/middlewares/ensureAuthenticated';
import DisciplinaController from '../controllers/DisciplinaController';

const disciplinaRouter = Router();
const disciplinaController = new DisciplinaController();

disciplinaRouter.get('/show', disciplinaController.listDisciplina);

disciplinaRouter.use(ensureAuthenticated);

disciplinaRouter.get(
  // Show all discipplina teacher
  '/list',
  celebrate({
    [Segments.BODY]: {
      professor_id: Joi.string().required(),
    },
  }),
  disciplinaController.showDisciplina,
);

disciplinaRouter.post(
  // Create
  '/create',
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

disciplinaRouter.put(
  // Update Disciplina
  '/update',
  celebrate({
    [Segments.BODY]: {
      professor_id: Joi.string().required(),
      titulo: Joi.string().required(),
      tag: Joi.array().required(), // pode ser um array de string
      descricao: Joi.string().required(),
      valor: Joi.number().required(),
    },
  }),
  disciplinaController.update,
);

disciplinaRouter.put(
  // Update Disciplina
  '/avaliacao',
  celebrate({
    [Segments.BODY]: {
      disciplina_id: Joi.string().required(),
      qtdAvaliacao: Joi.string().required(),
      mediaAvaliacao: Joi.number().required(),
    },
  }),
  disciplinaController.addAvaliacao,
);

disciplinaRouter.delete(
  // Update Disciplina
  '/delete',
  celebrate({
    [Segments.BODY]: {
      professor_id: Joi.string().required(),
    },
  }),
  disciplinaController.delete,
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
