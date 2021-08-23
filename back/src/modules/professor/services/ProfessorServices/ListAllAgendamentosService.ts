import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import IProfessorTokensRepository from '../../repositories/IProfessorTokensRepository';

interface IRequest {
  id: string;
}

// Esse serviço consiste em retornar todos os agendamentos vinculados ao professor

@injectable()
class ListAllAgendamentosService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Agendamento[]> {
    const userAppointment = await this.agendamentoRepository.findByProfessorID(
      id,
    );

    if (!userAppointment) {
      throw new AppError('Você não possui nenhum agendamento.');
    }

    // Precisa passar a data

    const result = userAppointment.sort(
      (a, b) => a.data.getTime() - b.data.getTime() && a.entrada - b.entrada,
    );

    return result;
  }
}

export default ListAllAgendamentosService;
