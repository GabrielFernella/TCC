import { getRepository, Repository } from 'typeorm';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';

import { ICreateAgendamentoDTO } from '@modules/agendamento/dtos/IAgendamentoDTO';
import Agendamento, { StatusAula } from '../entities/Agendamento';

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

  public async create(data: ICreateAgendamentoDTO): Promise<Agendamento> {
    const createAgendamento = this.ormRepository.create(data);
    await this.ormRepository.save(createAgendamento);

    return createAgendamento;
  }

  public async listAgendamentoByDate(date: Date): Promise<Agendamento[]> {
    const agendamento = this.ormRepository.find({
      where: {
        data: date,
      },
    });

    return agendamento;
  }

  public async updateStatus(
    id: string,
    status: StatusAula,
  ): Promise<Agendamento | undefined> {
    // ################# Falta arrumar essa parte
    /* if (
      !(
        status === 'processando' ||
        status === 'confirmacao' ||
        status === 'efetivado' ||
        status === 'cancelado'
      )
    ) { */
    await this.ormRepository.update(id, {
      status,
    });
    const result = await this.ormRepository.findOne(id);
    return result;
  }

  public async save(agendamento: Agendamento): Promise<Agendamento> {
    return this.ormRepository.save(agendamento);
  }
}

export default AgendamentoRepository;
