import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import { IUpdateAgendamentoDTO } from '../dtos/IAgendamentoDTO';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';

import Agendamento from '../infra/typeorm/entities/Agendamento';

// Talvez usamos bem pouco essa ferramenta

@injectable()
class FindAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,

    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,
  ) {}

  public async execute(
    agendamento_id: string,
    status: number,
    user_id: string,
  ): Promise<Agendamento> {
    // valid status
    if (
      !(
        status === 0 ||
        status === 1 ||
        status === 2 ||
        status === 3 ||
        status === 5
      )
    ) {
      throw new AppError('Status inválido');
    }

    const agendamento = await this.agendamentoRepository.findById(
      agendamento_id,
    );
    if (!agendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    // # Validar se esse usuário tem permissão
    const professor = await this.professorRepository.findById(user_id);

    const aluno = await this.alunoRepository.findById(user_id);

    if (aluno === undefined && professor === undefined) {
      throw new AppError(
        'Esse usuário não tem permissão para cancelar esse agendamento',
      );
    }

    // Validar se já foi consluido
    if (agendamento.status === 5) {
      throw new AppError(
        'Não é permitida o alteração do agendamento que encontra concluído.',
      );
    }
    if (agendamento.status === 4) {
      throw new AppError(
        'Não é permitida o alteração do agendamento que encontra cancelado.',
      );
    }
    await this.agendamentoRepository.updateStatus(agendamento_id, status);

    return agendamento;
  }
}

export default FindAgendamentoService;

/*

 if (
      !(
        status === 0 ||
        status === 1 ||
        status === 2 ||
        status === 3 ||
        status === 5
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
      if (status === 1) {
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

    // Verificar se o horário está autorizado para realizar o cancelamento
    if (agendamento.data.getDate() === new Date().getDate()) {
      throw new AppError('Não é permitida o cancelamento da aula.');
    }

    if (agendamento.status === 4) {
      throw new AppError('Agendamento já está cancelado.');
    }

    if (agendamento.status === 5) {
      throw new AppError(
        'Não é permitida o cancelamento da aula para uma aula já concluída.',
      );
    }

    const updatedAgendamento = await this.agendamentoRepository.updateStatus(
      agendamnto_id,
      status,
    );
    if (!updatedAgendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    if (status === 4) {
      await this.pagamentoRepository.updateStatus(agendamento.pagamento_id, 4);
    }

    return updatedAgendamento;
*/
