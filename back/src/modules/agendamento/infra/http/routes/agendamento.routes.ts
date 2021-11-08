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

// Update Agendamento
agendamentoRouter.put(
  '/status',
  celebrate({
    [Segments.BODY]: {
      agendamento_id: Joi.string().uuid().required(),
      status: Joi.number().required(),
    },
  }),
  agendamentoController.updateStatus,
);

// Update Link
agendamentoRouter.put(
  '/link',
  celebrate({
    [Segments.BODY]: {
      agendamento_id: Joi.string().uuid().required(),
      link: Joi.string().required(),
    },
  }),
  agendamentoController.updateLink,
);

// Get info Agendamento
agendamentoRouter.get(
  '/info/:agendamento_id',
  celebrate({
    [Segments.PARAMS]: {
      agendamento_id: Joi.string().uuid().required(),
    },
  }),
  agendamentoController.info,
);

agendamentoRouter.post(
  '/concluir',
  celebrate({
    [Segments.BODY]: {
      id_agendamento: Joi.string().uuid().required(),
      nota: Joi.string().required(),
      opiniao: Joi.string().required(),
    },
  }),
  agendamentoController.conclude,
);

agendamentoRouter.put(
  '/cancel/:agendamento_id',
  celebrate({
    [Segments.PARAMS]: {
      agendamento_id: Joi.string().uuid().required(),
    },
  }),
  agendamentoController.cancelAgendamento,
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
