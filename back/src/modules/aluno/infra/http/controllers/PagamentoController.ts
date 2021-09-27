import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPagamentos from '@modules/aluno/services/ListPagamentos';

export default class PagamentoController {
  public async show(request: Request, response: Response) {
    const { id } = request.user;

    const listPagamentos = container.resolve(ListPagamentos);

    const pagamentos = await listPagamentos.execute({ id });

    return response.json(classToClass(pagamentos));
  }
}
