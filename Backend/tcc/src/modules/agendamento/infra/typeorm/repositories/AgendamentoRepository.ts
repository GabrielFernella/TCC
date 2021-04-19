import { getRepository, Repository } from 'typeorm';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';

import {
  ICreateAgendamentoDTO,
  IUpdateAgendamentoDTO,
} from '@modules/agendamento/dtos/IAgendamentoDTO';
import Agendamento from '../entities/Agendamento';

class AgendamentoRepository implements IAgendamentoRepository {
  private ormRepository: Repository<Agendamento>;

  constructor() {
    this.ormRepository = getRepository(Agendamento);
  }

  public async findById(
    agendamento_id: string,
  ): Promise<Agendamento | undefined> {
    const result = await this.ormRepository.findOne(agendamento_id);
    return result;
  }

  public async findByAlunoID(
    aluno_id: string,
  ): Promise<Agendamento | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        aluno_id,
      },
    });
    return result;
  }

  public async create(data: ICreateAgendamentoDTO): Promise<Agendamento> {
    throw new Error('Method not implemented.');
  }

  public async update(data: IUpdateAgendamentoDTO): Promise<Agendamento> {
    throw new Error('Method not implemented.');
  }

  public async save(agendamento: Agendamento): Promise<Agendamento> {
    return this.ormRepository.save(agendamento);
  }
}

export default AgendamentoRepository;
