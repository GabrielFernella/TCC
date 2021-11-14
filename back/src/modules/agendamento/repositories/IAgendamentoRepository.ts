import Agendamento, { StatusAula } from '../infra/typeorm/entities/Agendamento';

import { ICreateAgendamentoDTO } from '../dtos/IAgendamentoDTO';

export default interface IAgendamentoRepository {
  findById(agendamento_id: string): Promise<Agendamento | undefined>;
  findByAlunoID(aluno_id: string): Promise<Agendamento[] | undefined>;
  findByProfessorID(professor_id: string): Promise<Agendamento[] | undefined>;
  findEffect(): Promise<Agendamento[] | undefined>;
  listAgendamentoByDate(date: Date): Promise<Agendamento[] | undefined>;

  // consultStatusAgendamento(id: string): Promise<string>;
  create(data: ICreateAgendamentoDTO): Promise<Agendamento>;
  updateStatus(
    id: string,
    status: StatusAula,
  ): Promise<Agendamento | undefined>;
  save(user: Agendamento): Promise<Agendamento>;
}
