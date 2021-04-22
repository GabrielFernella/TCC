import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/professor/infra/http/middlewares/ensureAuthenticated';
import DisciplinaController from '../controllers/DisciplinaController';

const disciplinaRouter = Router();
const disciplinaController = new DisciplinaController();

// Listagem Disciplina
disciplinaRouter.get('/list', disciplinaController.listAllDisciplina);

// Show all disciplina do professor_id
disciplinaRouter.get(
  '/find',
  celebrate({
    [Segments.BODY]: {
      disciplina_id: Joi.string().required(),
    },
  }),
  disciplinaController.findDisciplina,
);

// Autenticar Usuário
disciplinaRouter.use(ensureAuthenticated);

// Create Dsiciplina
disciplinaRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      // professor_id: Joi.string().required(),
      titulo: Joi.string().required(),
      tag: Joi.array().required(), // pode ser um array de string
      descricao: Joi.string().required(),
      valor: Joi.number().required(),
    },
  }),
  disciplinaController.create,
);

// Update Disciplina
disciplinaRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      disciplina_id: Joi.string().required(),
      titulo: Joi.string().required(),
      tag: Joi.array().required(), // pode ser um array de string
      descricao: Joi.string().required(),
      valor: Joi.number().required(),
    },
  }),
  disciplinaController.update,
);

// Update Disciplina -> AddAvaliacao
disciplinaRouter.put(
  '/avaliacao',
  celebrate({
    [Segments.BODY]: {
      disciplina_id: Joi.string().required(),
      qtdAvaliacao: Joi.number().required(),
      mediaAvaliacao: Joi.number().required(),
    },
  }),
  disciplinaController.addAvaliacao,
);

// Delete Disciplina #
disciplinaRouter.delete(
  '/delete',
  celebrate({
    [Segments.BODY]: {
      disciplina_id: Joi.string().required(),
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