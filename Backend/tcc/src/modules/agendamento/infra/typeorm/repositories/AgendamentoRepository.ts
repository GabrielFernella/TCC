import { getRepository, Repository } from 'typeorm';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';

import {
  ICreateAgendamentoDTO,
  IUpdateAgendamentoDTO,
  ICreateAgendamentoDTO2,
} from '@modules/agendamento/dtos/IAgendamentoDTO';
import Agendamento from '../entities/Agendamento';

class AgendamentoRepository implements IAgendamentoRepository {
  private ormRepository: Repository<Agendamento>;

  constructor() {
    this.ormRepository = getRepository(Agendamento);
  }
  create2(data: ICreateAgendamentoDTO2): Promise<Agendamento> {
    throw new Error('Method not implemented.');
  }

  public async findById(
    agendamento_id: string,
  ): Promise<Agendamento | undefined> {
    const result = await this.ormRepository.findOne(agendamento_id);
    return result;
  }

  public async findByAlunoID(
    aluno_id: string,
  ): Promise<Agendamento[] | undefined> {
    const result = await this.ormRepository.find({
      where: {
        aluno_id,
      },
    });
    return result;
  }

  public async findByProfessorID(
    professor_id: string,
  ): Promise<Agendamento[] | undefined> {
    const result = await this.ormRepository.find({
      where: {
        professor_id,
      },
    });
    return result;
  }

  public async create(data: ICreateAgendamentoDTO2): Promise<Agendamento> {
    const createAgendamento = this.ormRepository.create(data);
    await this.ormRepository.save(createAgendamento);

    return createAgendamento;
  }

  public async updateStatus(
    id: string,
    status: string,
  ): Promise<Agendamento | undefined> {
    /* if (
      !(
        status === 'processando' ||
        status === 'confirmacao' ||
        status === 'efetivado' ||
        status === 'cancelado'
      )
    ) { */
    //await this.ormRepository.update(id, { status });
    const result = await this.ormRepository.findOne(id);
    return result;
  }

  public async save(agendamento: Agendamento): Promise<Agendamento> {
    return this.ormRepository.save(agendamento);
  }
}

export default AgendamentoRepository;
