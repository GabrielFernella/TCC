import Agendamento from '../infra/typeorm/entities/Agendamento';

import {
  IUpdateAgendamentoDTO,
  ICreateAgendamentoDTO2,
} from '../dtos/IAgendamentoDTO';

export default interface IAgendamentoRepository {
  findById(agendamento_id: string): Promise<Agendamento | undefined>;
  findByAlunoID(aluno_id: string): Promise<Agendamento[] | undefined>;
  findByProfessorID(professor_id: string): Promise<Agendamento[] | undefined>;
  // consultStatusAgendamento(id: string): Promise<string>;
  create(data: ICreateAgendamentoDTO2): Promise<Agendamento>;
  updateStatus(id: string, status: string): Promise<Agendamento | undefined>;
  save(user: Agendamento): Promise<Agendamento>;
}
