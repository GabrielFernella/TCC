import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPagamentos from '@modules/aluno/services/ListPagamentos';
import PayPagamentoService from '@modules/aluno/services/PayPagamentoService';

export default class PagamentoController {
  public async show(request: Request, response: Response) {
    const { id } = request.user;

    const listPagamentos = container.resolve(ListPagamentos);

    const pagamentos = await listPagamentos.execute({ id });

    return response.json(classToClass(pagamentos));
  }

  public async update(request: Request, response: Response) {
    const { id_pagamento, status, key } = request.body;

    const efetuarPagamento = container.resolve(PayPagamentoService);

    const pagamentos = await efetuarPagamento.execute({
      id_pagamento,
      status,
      key,
    });

    return response.json(classToClass(pagamentos));
  }
}
