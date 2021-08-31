import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import IProfessorRepository from '../../repositories/IProfessorRepository';

interface IRequest {
  id: string;
  date: string;
}

// Esse serviço consiste em retornar todos os agendamentos vinculados ao professor filtrando pela data

@injectable()
class ListAllAgendamentosService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute({ id, date }: IRequest): Promise<Agendamento[]> {
    const userAppointment = await this.agendamentoRepository.findByProfessorID(
      id,
    );

    if (!userAppointment) {
      throw new AppError('Você não possui nenhum agendamento.');
    }

    const trateDate = date.split('-', 3);

    const dataSelect = new Date(
      Number(trateDate[2]),
      Number(trateDate[1]) - 1,
      Number(trateDate[0]),
    );

    // Filtrando por data
    const agendamentos = userAppointment.filter(
      item => item.data === dataSelect,
    );

    // Precisa passar a data

    const result = agendamentos.sort(
      (a, b) => a.data.getTime() - b.data.getTime() && a.entrada - b.entrada,
    );

    return result;
  }
}

export default ListAllAgendamentosService;
