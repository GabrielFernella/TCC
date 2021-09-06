import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import { IUpdateAgendamentoDTO } from '../dtos/IAgendamentoDTO';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';

import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class FindAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,
  ) {}

  public async execute(
    agendamnto_id: string,
    status: number,
    user_id: string,
  ): Promise<Agendamento> {
    if (
      !(
        status === 0 ||
        status === 1 ||
        status === 2 ||
        status === 3 ||
        status === 4
      )
    ) {
      throw new AppError('Status inválido');
    }

    // Busca o agendamento
    const agendamento = await this.agendamentoRepository.findById(
      agendamnto_id,
    );
    if (!agendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    const updatedProfessor = await this.professorRepository.findById(user_id);

    const updatedAluno = await this.alunoRepository.findById(user_id);

    if (updatedProfessor) {
      // Valida se é o professor que está fazendo o update
      if (status === 1 || status === 4) {
        // Confirma se esse professor pertence a essa disciplinas
        if (agendamento.professor_id !== updatedProfessor.id) {
          throw new AppError('Esse agendamento não pertence à você!.');
        }
      }
    } else if (updatedAluno) {
      // Valida se é o aluno que está fazendo o update
      if (status === 4) {
        // Confirma se esse professor pertence a essa disciplinas
        if (agendamento.aluno_id !== updatedAluno.id) {
          throw new AppError('Esse agendamento não pertence à você!.');
        }
      }
    } else {
      throw new AppError('Usuário não encontrado.');
    }

    const updatedAgendamento = await this.agendamentoRepository.updateStatus(
      agendamnto_id,
      status,
    );
    if (!updatedAgendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    return updatedAgendamento;
  }
}

export default FindAgendamentoService;
