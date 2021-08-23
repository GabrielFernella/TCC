import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

// Esse serviço procura todos os agendamentos

@injectable()
class FindAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(agendamento_id: string): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findById(
      agendamento_id,
    );

    if (!agendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    return agendamento;
  }
}

export default FindAgendamentoService;
