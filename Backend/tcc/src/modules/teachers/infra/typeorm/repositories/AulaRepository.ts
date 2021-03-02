import { getRepository, Repository } from 'typeorm';

import ICreateAulaDTO from '@modules/teachers/dtos/ICreateAulaDTO';
import IAulaRepository from '@modules/teachers/repositories/IAulaRepository';

import Aula from '../entities/Aula';

class AulaRepository implements IAulaRepository {
  private ormRepository: Repository<Aula>;

  constructor() {
    this.ormRepository = getRepository(Aula);
  }

  public async create(data: ICreateAulaDTO): Promise<Aula> {
    const createAula = this.ormRepository.create(data);

    await this.ormRepository.save(data);

    return createAula;
  }

  public async save(data: Aula): Promise<Aula> {
    return this.ormRepository.save(data);
  }
}

export default AulaRepository;
