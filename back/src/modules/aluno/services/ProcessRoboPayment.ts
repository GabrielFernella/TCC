import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '../repositories/IAlunoRepository';
import Pagamento from '../infra/typeorm/entities/Pagamento';
import IPagamentoRepository from '../repositories/IPagamentoRepository';

@injectable()
class PayPagamentoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,
  ) {}

  public async execute(): Promise<Pagamento[] | undefined> {
    const findPagamento = await this.pagamentoRepository.findProcess();

    const rawResponse = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ a: 1, b: 'Textual content' }),
    })
      .then(response => {
        console.log(
          'Processar todos os pagamentos e verificar se deu tudo certo',
        );
        return response;
      })
      .catch(err => {
        throw new AppError('Algo deu errado em processar os pagamentos');
      });

    const content = await rawResponse.json();

    console.log(content);

    /*
      Valor que poderá ser retornado: {
        id_pagamento: string,
        efetuado: true
      }
    */

    // montar a lógica de processar tudo
    /* const result = await this.pagamentoRepository.updateStatus(
      findPagamento.id,
      status,
    );

    if (!result) {
      throw new AppError('Algo deu errado em processar o pagamento');
    } */

    return findPagamento;
  }
}

export default PayPagamentoService;

/*

(async () => {
  const rawResponse = await fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 'Textual content'})
  });
  const content = await rawResponse.json();

  console.log(content);
})();


*/
