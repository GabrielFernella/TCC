import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

/*
  Esse serviço é responsável por atualizar o agendamento como concluido e aplicar a nota ao professor
*/

// @ Falta
// 1 - Validar se a data já passou para ele avaliar a aula

interface IRequest {
  user_id: string;
  id_agendamento: string;
  nota: string;
  opiniao: string;
}

@injectable()
class ConcludeAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,
  ) {}

  public async execute({
    user_id,
    id_agendamento,
    nota,
    opiniao,
  }: IRequest): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findById(
      id_agendamento,
    );

    if (!agendamento) {
      throw new AppError('Agendamento não encontrado.');
    }

    if (agendamento.aluno_id !== user_id) {
      throw new AppError('Você não pertence a esse agendamento.');
    }

    if (agendamento.status === 4) {
      throw new AppError('Esse agendamento já foi cancelado.');
    }

    const pagamento = await this.pagamentoRepository.findById(
      agendamento.pagamento_id,
    );
    if (!pagamento) {
      throw new AppError(
        'Algo deu errado em carregar o pagamento desse agendamento.',
      );
    }

    if (
      pagamento.statusPagamento === 0 ||
      pagamento.statusPagamento === 1 ||
      pagamento.statusPagamento === 3 ||
      pagamento.statusPagamento === 4
    ) {
      throw new AppError('Você não concluiu o pagamento dessa aula.');
    }

    agendamento.nota = nota;
    agendamento.opiniao = opiniao;
    agendamento.status = 5;

    pagamento.statusPagamento = 5;

    await this.pagamentoRepository.save(pagamento);
    const result = await this.agendamentoRepository.save(agendamento);

    return result;
  }
}

export default ConcludeAgendamentoService;
