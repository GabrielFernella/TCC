import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PagamentoController from '../controllers/PagamentoController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pagamentoRoute = Router();
const pagamentoController = new PagamentoController();

pagamentoRoute.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      id_pagamento: Joi.string().required(),
    },
  }),
  pagamentoController.update,
);

// Autenticar Usuário
pagamentoRoute.use(ensureAuthenticated);

pagamentoRoute.get('/list', pagamentoController.show);

export default pagamentoRoute;
