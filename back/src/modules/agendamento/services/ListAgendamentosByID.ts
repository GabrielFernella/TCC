import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class ListAgendamentosByID {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  /* public async execute(email: string): Promise<Agendamento[]> {
    // Procura a disciplina através do ID
    const result = await this.agendamentoRepository.findById(email);
    if (!result) {
      throw new AppError(
        'Naõ foi encontrado nenhum agendamento para esse Aluno.',
      );
    }
    return result;
  } */
}

export default ListAgendamentosByID;
