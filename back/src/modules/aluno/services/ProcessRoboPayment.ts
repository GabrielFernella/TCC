import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '../repositories/IAlunoRepository';
import Pagamento from '../infra/typeorm/entities/Pagamento';
import IPagamentoRepository from '../repositories/IPagamentoRepository';

interface IResponse {
  id_pagamento: string;
  pay: boolean;
}

/*
  Esse serviço consistem em chamar uma API de pagamento para processar todos os pagamentos que precisam ser executados
  gerando esses pagamentos, é retornado uma resposta da API com um Array com todos que foram efetivados, sendo assim,
  eu altero o status apenas para os que foram efetivados.
*/

@injectable()
class PayPagamentoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,
  ) {}

  public async execute(): Promise<IResponse[] | undefined> {
    const findPagamento = await this.pagamentoRepository.findProcess();

    if (!findPagamento) {
      throw new AppError('Nenhum pagamento para processar');
    }

    const buildObject = findPagamento.map(item => {
      return { id_pagamento: item.id, pay: item.statusPagamento };
    });
    console.log(buildObject);

    // Passsar a API do arthur

    const rawResponse = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildObject),
    })
      .then(response => {
        console.log(
          'Processar todos os pagamentos e verificar se deu tudo certo',
        );

        // const value: IResponse[] = response<IResponse[]>

        return response;
      })
      .catch(() => {
        throw new AppError('Algo deu errado em processar os pagamentos');
      });

    // Processando todos os pagamentos que deram sucesso
    const resp: IResponse[] = Object.values(rawResponse);

    const process = resp.map(async item => {
      if (item.pay === true) {
        const account = await this.pagamentoRepository.findById(
          item.id_pagamento,
        );

        if (!account) {
          throw new AppError('Algo deu errado em processar os pagamentos');
        }

        await this.pagamentoRepository.updateStatus(account.id, 5);
      }
    });

    // const content = await rawResponse.json();

    console.log(Object.values(rawResponse));
    console.log(process);

    return resp;
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
