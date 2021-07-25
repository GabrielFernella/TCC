import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IUpdateAgendamentoDTO } from '../dtos/IAgendamentoDTO';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class FindAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(id: string, status: string): Promise<Agendamento> {
    if (
      !(
        status === 'processando' ||
        status === 'confirmacao' ||
        status === 'efetivado' ||
        status === 'cancelado'
      )
    ) {
      throw new AppError('Status inválido não encontrado');
    }

    const agendamento = await this.agendamentoRepository.updateStatus(
      id,
      status,
    );
    if (!agendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    return agendamento;
  }
}

export default FindAgendamentoService;
