import { getRepository, Repository } from 'typeorm';

import ICreateDisponibilidadeDTO from '@modules/teachers/dtos/ICreateDisponibilidadeDTO';
import IDisponibilidadeRepository from '@modules/teachers/repositories/IDisponibilidadeRepository';

import Disponibilidade from '../entities/Disponibilidade';

class DisponibilidadeRepository implements IDisponibilidadeRepository {
  private ormRepository: Repository<Disponibilidade>;

  constructor() {
    this.ormRepository = getRepository(Disponibilidade);
  }

  public async create(
    data: ICreateDisponibilidadeDTO,
  ): Promise<Disponibilidade> {
    // Essa função deve ser executada 1 única vez
    const disponibilidade = this.ormRepository.create(data);

    await this.ormRepository.save(disponibilidade);

    return disponibilidade;
  }

  public async save(data: Disponibilidade): Promise<Disponibilidade> {
    return this.ormRepository.save(data);
  }
}

export default DisponibilidadeRepository;
