import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';

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

  public async execute(email: string): Promise<Agendamento[]> {
    const findAluno = await this.alunoRepository.findByEmail(email);

    if (!findAluno) {
      throw new AppError('Aluno não encontrado.');
    }

    // Procura a disciplina através do ID
    const result = await this.agendamentoRepository.findByAlunoID(findAluno.id);
    if (!result) {
      throw new AppError(
        'Naõ foi encontrado nenhum agendamento para esse Aluno.',
      );
    }
    return result;
  }
}

export default FindDisciplinaService;
