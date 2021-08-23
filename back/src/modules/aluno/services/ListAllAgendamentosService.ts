import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';

interface IRequest {
  id: string;
}

// Esse serviço consiste em retornar todos os agendamentos vinculados ao professor

@injectable()
class ListAllAgendamentosService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Agendamento[]> {
    const userAppointment = await this.agendamentoRepository.findByAlunoID(id);

    if (!userAppointment) {
      throw new AppError('Você não possui nenhum agendamento.');
    }

    // Precisa passar a data para filtrar result = array.filter(a => a > min && a < max);

    // Conferir se está retornando o prósimo perto da data
    const result = userAppointment.sort(
      (a, b) =>
        new Date().getTime() - b.data.getTime() && a.entrada - b.entrada,
    );

    return result;
  }
}

export default ListAllAgendamentosService;
