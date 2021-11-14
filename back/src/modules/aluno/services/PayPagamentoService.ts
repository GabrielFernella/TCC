import { injectable, inject } from 'tsyringe';
import axios from 'axios';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '../repositories/IAlunoRepository';
import Pagamento from '../infra/typeorm/entities/Pagamento';
import IPagamentoRepository from '../repositories/IPagamentoRepository';

interface IRequest {
  id_pagamento: string;
}

interface IResponseMercadoPago {
  status: string;
}

@injectable()
class PayPagamentoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,
  ) {}

  public async execute({ id_pagamento }: IRequest): Promise<Pagamento> {
    let statusAtual = 0;
    const findPagamento = await this.pagamentoRepository.findById(id_pagamento);

    if (!findPagamento) {
      throw new AppError('Pendencia não encontrada');
    }

    // Buscando informações referente ao mercado pago
    const getMercadoPago: IResponseMercadoPago = await axios
      .get(`http://localhost:80/search/${findPagamento.id}`)
      .then(response => {
        return response.data.result[0];
      })
      .catch(() => {
        throw new AppError(
          'Não foi possível verificar os serviços do mercado pago.',
        );
      });

    if (!getMercadoPago) {
      throw new AppError(
        'Pagamento não encontrado na base de dados do mercado pago.',
      );
    }

    if (getMercadoPago.status === 'processing') {
      statusAtual = 1;
    }

    if (getMercadoPago.status === 'approved') {
      statusAtual = 2;
    }

    if (getMercadoPago.status === 'reproved') {
      statusAtual = 3;
    }

    const result = await this.pagamentoRepository.updateStatus(
      findPagamento.id,
      statusAtual,
    );

    if (!result) {
      throw new AppError('Algo deu errado em processar o pagamento');
    }

    return result;
  }
}

export default PayPagamentoService;
