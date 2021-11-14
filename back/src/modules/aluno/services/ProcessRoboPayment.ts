import { injectable, inject } from 'tsyringe';
import path from 'path';

import axios from 'axios';

import AppError from '@shared/errors/AppError';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { json } from 'express';
import IAlunoRepository from '../repositories/IAlunoRepository';
import Pagamento from '../infra/typeorm/entities/Pagamento';
import IPagamentoRepository from '../repositories/IPagamentoRepository';

interface IResponse {
  id_pagamento: string;
  pay: boolean;
}

interface IResponseMercadoPago {
  agendamento: Agendamento | undefined;
  pagamento: Pagamento | undefined;
}

interface IObject {
  number: number;
  agendamento: Agendamento;
  pagamento: Pagamento;
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

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(): Promise<any[] | undefined> {
    const payObject: IObject[] = [];
    const agendamentos = await this.agendamentoRepository.findEffect();
    if (!agendamentos) {
      throw new AppError('Nenhum pagamento para processar');
    }

    agendamentos.map(async (item, index) => {
      const pay = await this.pagamentoRepository.findById(item.pagamento_id);
      if (pay) {
        if (pay.statusPagamento === 2) {
          payObject.push({ number: index, agendamento: item, pagamento: pay });
        }
      }
    });

    console.log(payObject);

    const value = payObject.map(async item => {
      const effAgendamento = await this.agendamentoRepository.updateStatus(
        item.agendamento.id,
        5,
      );
      const effPagamento = await this.pagamentoRepository.updateStatus(
        item.pagamento.id,
        5,
      );
      return { agendamento: effAgendamento, pagamento: effPagamento };
    });

    payObject.map(async item => {
      // Buscando o arquivo template de email de recuperação
      const forgotPasswordTemplate = path.resolve(
        __dirname,
        '..',
        'views',
        'create_agendamento.hbs',
      );

      // Enviar o email para o destinatário
      await this.mailProvider.sendMail({
        to: {
          name: item.agendamento.professor.name,
          email: item.agendamento.professor.email,
        },
        subject: '[WebEduca] Agendamento cadastrado',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: item.agendamento.professor.id,
            title: item.agendamento.disciplina.titulo,
            // link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
          },
        },
      });
    });

    /* const findPagamento = await this.pagamentoRepository.findProcess();

    if (!findPagamento) {
      throw new AppError('Nenhum pagamento para processar');
    }

    const buildObject = findPagamento.map(item => {
      return { id_pagamento: item.id, pay: item.statusPagamento };
    });
    console.log(buildObject); */

    // Buscando o status dos agendamentos que podem ser confirmados status pagamento 2 e agendamento status 3

    // Processando todos os pagamentos que deram sucesso para o professor
    // const resp: IResponse[] = Object.values(rawResponse);

    return value;
  }
}

export default PayPagamentoService;

/*
// Buscando informações referente ao mercado pago
    const getMercadoPago: IResponseMercadoPago = await axios
      .get(`http://localhost:80/search/${findPagamento.id}`)
      .then(response => {
        return response.data.result[0];
      })
      .catch(() => {
        throw new AppError('Algo deu errado em processar os pagamentos');
      });
*/

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

/*
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

*/
