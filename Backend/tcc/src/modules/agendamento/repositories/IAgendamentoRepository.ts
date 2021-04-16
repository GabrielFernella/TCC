import Agendamento from '../infra/typeorm/entities/Agendamento';

import {
  ICreateAgendamentoDTO,
  IUpdateAgendamentoDTO,
} from '../dtos/IAgendamentoDTO';

export default interface IAgendamentoRepository {
  findById(id: string): Promise<Agendamento | undefined>;
  findByEmailAluno(email: string): Promise<Agendamento | undefined>;
  consultStatusAgendamento(id: string): Promise<string>;
  create(data: ICreateAgendamentoDTO): Promise<Agendamento>;
  update(data: IUpdateAgendamentoDTO): Promise<Agendamento>;
  save(user: Agendamento): Promise<Agendamento>;
}
