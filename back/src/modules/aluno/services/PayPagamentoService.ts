import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '../repositories/IAlunoRepository';
import Pagamento from '../infra/typeorm/entities/Pagamento';
import IPagamentoRepository from '../repositories/IPagamentoRepository';

interface IRequest {
  id_pagamento: string;
  id_user: string;
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
    id_user,
    key,
  }: IRequest): Promise<Pagamento> {
    const user = await this.alunoRepository.findById(id_user);
    if (!user) {
      throw new AppError('User not found');
    }

    // Procurando se há um user com o mesmo email
    const listPedentUser = await this.pagamentoRepository.findByEmailPagador(
      user.email,
    );
    if (!listPedentUser) {
      throw new AppError('Email address already used');
    }

    const verifyPagamento = listPedentUser.find(
      item => item.id === id_pagamento,
    );
    if (!verifyPagamento) {
      throw new AppError('Pendencia não encontrada');
    }

    // talvez possa remover
    if (verifyPagamento.key !== key) {
      throw new AppError('Chave não atribulada');
    }

    const result = await this.pagamentoRepository.updateStatus(
      verifyPagamento.id,
      4,
    );

    if (!result) {
      throw new AppError('Algo deu errado em processar o pagamento');
    }

    return result;
  }
}

export default PayPagamentoService;
