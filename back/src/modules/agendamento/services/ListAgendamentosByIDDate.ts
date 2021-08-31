import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

interface IRequest {
  agendamento_id: string;
}

// ## Esse serviço retorna as informações do agendamento de acordo com o ID do mesmo

// ### REVER ###

@injectable()
class ListAgendamentosByIDDate {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute({ agendamento_id }: IRequest): Promise<Agendamento> {
    // Procura a disciplina através do ID
    const agendamento = await this.agendamentoRepository.findById(
      agendamento_id,
    );
    if (!agendamento) {
      throw new AppError(
        'Naõ foi encontrado nenhum agendamento para esse Aluno.',
      );
    }

    return agendamento;
  }
}

export default ListAgendamentosByIDDate;
