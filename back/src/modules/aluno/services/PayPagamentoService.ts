import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '../repositories/IAlunoRepository';
import Pagamento from '../infra/typeorm/entities/Pagamento';
import IPagamentoRepository from '../repositories/IPagamentoRepository';

interface IRequest {
  id_pagamento: string;
  status: number;
  key: string;
}

@injectable()
class PayPagamentoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,
  ) {}

  public async execute({
    id_pagamento,
    status,
    key,
  }: IRequest): Promise<Pagamento> {
    const findPagamento = await this.pagamentoRepository.findById(id_pagamento);

    if (!findPagamento) {
      throw new AppError('Pendencia não encontrada');
    }

    // talvez possa remover
    if (findPagamento.key !== key) {
      throw new AppError('Chave não atribulada');
    }

    const result = await this.pagamentoRepository.updateStatus(
      findPagamento.id,
      status,
    );

    if (!result) {
      throw new AppError('Algo deu errado em processar o pagamento');
    }

    return result;
  }
}

export default PayPagamentoService;
