import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { ICreateAgendamentoDTO } from '../dtos/IAgendamentoDTO';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class CreateAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(data: ICreateAgendamentoDTO): Promise<Agendamento> {
    const result = await this.agendamentoRepository.create(data);

    if (!result) {
      throw new AppError('Não foi possível criar o agendamento');
    }

    return result;
  }
}

export default CreateAgendamentoService;
