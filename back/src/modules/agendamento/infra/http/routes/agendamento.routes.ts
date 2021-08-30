import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/professor/infra/http/middlewares/ensureAuthenticated';
import AgendamentoController from '../controllers/AgendamentoController';

const agendamentoRouter = Router();
const agendamentoController = new AgendamentoController();

// Show all disciplina do professor_id
agendamentoRouter.get(
  '/find',
  celebrate({
    [Segments.BODY]: {
      disciplina_id: Joi.string().required(),
    },
  }),
  agendamentoController.create,
);

// Criar agendamento
agendamentoRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      data: Joi.date().required(),
      entrada: Joi.number().required(),
      aluno_id: Joi.string().required(),
      professor_id: Joi.string().required(),
      disciplina_id: Joi.string().required(),
    },
  }),
  agendamentoController.create,
);

// Autenticar Usuário Através do Middleware, assim consigo pegar o ID do mesmo
agendamentoRouter.use(ensureAuthenticated);

// Listar todas as horas disponíveis do professor
agendamentoRouter.post(
  '/prof-horas',
  celebrate({
    [Segments.BODY]: {
      professor_id: Joi.string().uuid().required(),
      data: Joi.string().required(),
    },
  }),
  agendamentoController.ListHorasDisponiveisProf,
);

// Update Disciplina
agendamentoRouter.put(
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
  agendamentoController.create,
);

// Update Disciplina -> AddAvaliacao
agendamentoRouter.put(
  '/avaliacao',
  celebrate({
    [Segments.BODY]: {
      disciplina_id: Joi.string().required(),
      qtdAvaliacao: Joi.number().required(),
      mediaAvaliacao: Joi.number().required(),
    },
  }),
  agendamentoController.create,
);

export default agendamentoRouter;

/*
professor_id
titulo
tag
descricao
valor
qtdAvaliacao
mediaAvaliacao
*/
