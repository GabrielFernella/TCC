import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class FindByAlunoIdService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(user_id: string): Promise<Agendamento[]> {
    const findByAluno = await this.agendamentoRepository.findByAlunoID(user_id);

    if (!findByAluno) {
      throw new AppError(
        'Naõ foi encontrado nenhum agendamento para esse Aluno',
      );
    }

    return findByAluno;
  }
}

export default FindByAlunoIdService;
