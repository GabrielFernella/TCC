import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class ListHorasDisponiveisProfService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(user_id: string, data: string): Promise<Agendamento[]> {
    const findByProfessor = await this.agendamentoRepository.findByProfessorID(
      user_id,
    );

    const trateDate = data.split('-');

    const dataSelect = new Date(
      Number(trateDate[0]),
      Number(trateDate[1]) - 1,
      Number(trateDate[2]),
    );

    // console.log(dataSelect);

    // Validar se o Professor possui disponibilidade para essa data

    // Validar em um array quais são os horários disponíveis para aquele dia, ()

    // Validar se tem algum outro agendamento nesse horário (validar o Array) - Montar um array com o anterior trazendo se tem horário disponível ou n

    if (!findByProfessor) {
      throw new AppError(
        'Não foi encontrado nenhum agendamento para esse Professor',
      );
    }

    return findByProfessor;
  }
}

export default ListHorasDisponiveisProfService;
