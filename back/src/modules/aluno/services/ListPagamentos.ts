import { inject, injectable } from 'tsyringe';

import { isEqual, parseISO, format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import Disciplina from '@modules/professor/infra/typeorm/entities/Disciplina';
import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';
import Pagamento from '../infra/typeorm/entities/Pagamento';
import PagamentoRepository from '../infra/typeorm/repositories/PagamentoRepository';

interface IRequest {
  id: string;
}

/* interface IResponse {
  pagamento: Pagamento;
} */

// Esse serviço consiste em retornar todos os agendamentos vinculados ao Aluno filtrando pela data

@injectable()
class ListPagamento {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: PagamentoRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Pagamento[]> {
    // find user
    const user = await this.alunoRepository.findById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    // Busca todas as pendencias do usuário
    const userPagamento = await this.pagamentoRepository.findByEmailPagador(
      user.email,
    );
    if (!userPagamento) {
      throw new AppError('Você não possui nenhuma pendencia.');
    }

    return userPagamento;
  }
}

export default ListPagamento;
