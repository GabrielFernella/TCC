import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class FindDisciplinaService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(email_aluno: string): Promise<Agendamento> {
    const findAluno = await this.alunoRepository.findByEmail(email_aluno);

    if (!findAluno) {
      throw new AppError('Aluno não encontrado.');
    }

    // Procura a disciplina através do ID
    const findBayEmailAluno = await this.agendamentoRepository.findByAlunoID(
      findAluno.id,
    );
    if (!findBayEmailAluno) {
      throw new AppError(
        'Naõ foi encontrado nenhum agendamento para esse Aluno.',
      );
    }

    return findBayEmailAluno;
  }
}

export default FindDisciplinaService;
