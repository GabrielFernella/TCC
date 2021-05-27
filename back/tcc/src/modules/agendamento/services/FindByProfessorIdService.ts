import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class FindByProfessorIdService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(user_id: string): Promise<Agendamento[]> {
    const findByProfessor = await this.agendamentoRepository.findByProfessorID(
      user_id,
    );

    if (!findByProfessor) {
      throw new AppError(
        'Naõ foi encontrado nenhum agendamento para esse Professor',
      );
    }

    return findByProfessor;
  }
}

export default FindByProfessorIdService;
