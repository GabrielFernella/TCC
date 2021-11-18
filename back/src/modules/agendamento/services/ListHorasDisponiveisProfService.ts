import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import IDisponibilidadeRepository from '@modules/professor/repositories/IDisponibilidadeRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

// ### Esse serviço consiste em retornar todos os horários disponíveis do professor de acordo com o dia selecionado

interface IHours {
  hora: number;
  disp: boolean;
}

@injectable()
class ListHorasDisponiveisProfService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(professor_id: string, data: string): Promise<IHours[]> {
    const agendamentosProfessor = await this.agendamentoRepository.findByProfessorID(
      professor_id,
    );

    const horas = [
      { hora: 0, disp: true },
      { hora: 1, disp: true },
      { hora: 2, disp: true },
      { hora: 3, disp: true },
      { hora: 4, disp: true },
      { hora: 5, disp: true },
      { hora: 6, disp: true },
      { hora: 7, disp: true },
      { hora: 8, disp: true },
      { hora: 9, disp: true },
      { hora: 10, disp: true },
      { hora: 11, disp: true },
      { hora: 12, disp: true },
      { hora: 13, disp: true },
      { hora: 14, disp: true },
      { hora: 15, disp: true },
      { hora: 16, disp: true },
      { hora: 17, disp: true },
      { hora: 18, disp: true },
      { hora: 19, disp: true },
      { hora: 20, disp: true },
      { hora: 21, disp: true },
      { hora: 22, disp: true },
      { hora: 23, disp: true },
    ];

    // const professor = await this.professorRepository.findById(professor_id);

    const trateDate = data.split('-', 3);

    const dataSelect = new Date(
      Number(trateDate[2]),
      Number(trateDate[1]) - 1,
      Number(trateDate[0]),
    );

    // Validar se o Professor possui disponibilidade para essa data
    const validateDateProfessor = await this.disponibilidadeRepository.findByDay(
      professor_id,
      dataSelect.getDay(),
    );

    if (!validateDateProfessor) {
      throw new AppError(
        'Esse professor não possui disponibilidade para esse dia.',
      );
    }

    // Listando os horários do professor disponiveis para esse dia
    const horariosDisponiveis = horas.filter(
      item =>
        item.hora >= validateDateProfessor.horarioEntrada &&
        item.hora <= validateDateProfessor.horarioSaida,
    );

    // Validar em um array quais são os horários disponíveis para aquele dia, pega os agendamentos e verifica os horários
    const validHorasAgendadas = await this.agendamentoRepository.listAgendamentoByDate(
      dataSelect,
    );

    if (!validHorasAgendadas) {
      return horariosDisponiveis;
    }

    const validHorasDisponiveis = horariosDisponiveis.map(item => {
      const result = validHorasAgendadas.find(
        h => h.entrada === item.hora && h.status !== 4,
      );

      if (result) {
        if (result.status !== 4) return { hora: item.hora, disp: false };
      }
      return { hora: item.hora, disp: true };
    });

    /* const validHorasDisponiveis = horariosDisponiveis.map(item => {
      const result = validHorasAgendadas.find(h => h.entrada === item.hora);

      if (result) {
        if (result.status !== 4) return { hora: item.hora, disp: false };
      }
      return { hora: item.hora, disp: true };
    }); */

    // console.log(validHorasDisponiveis);

    // Validar se tem algum outro agendamento nesse horário (validar o Array) - Montar um array com o anterior trazendo se tem horário disponível ou n

    /* if (!agendamentosProfessor) {
      throw new AppError(
        'Não foi encontrado nenhum agendamento para esse Professor',
      );
    } */

    return validHorasDisponiveis;
  }
}

export default ListHorasDisponiveisProfService;
