import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// Imports
import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';
import IDisponibilidadeRepository from '@modules/professor/repositories/IDisponibilidadeRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

// DTOs
import { ICreateAgendamentoDTO } from '../dtos/IAgendamentoDTO';

@injectable()
class CreateAgendamentoService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,

    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  // Validações
  // - validar o tempo(não é permitido criar antes da data atual)
  // - validar se o aluno pode fazer um agendamento
  // - validar se todos os campos(aluno, professor, disciplina e criar pagamento) são válidos
  // - validar se a disponibilidade do professor está entre a data e hora proposta

  public async execute(data: ICreateAgendamentoDTO): Promise<Agendamento> {
    const result = await this.agendamentoRepository.create(data);

    if (!result) {
      throw new AppError('Não foi possível criar o agendamento');
    }

    return result;
  }
}

export default CreateAgendamentoService;
