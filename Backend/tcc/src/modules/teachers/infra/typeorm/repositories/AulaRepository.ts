import { getRepository, Repository } from 'typeorm';

import ICreateAulaDTO from '@modules/teachers/dtos/ICreateAulaDTO';
import IAulaRepository from '@modules/teachers/repositories/IAulaRepository';

import AppError from '@shared/errors/AppError';
import Aula from '../entities/Aula';

class AulaRepository implements IAulaRepository {
  private ormRepository: Repository<Aula>;

  constructor() {
    this.ormRepository = getRepository(Aula);
  }

  public async findByID(id: string): Promise<Aula | undefined> {
    const aula = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return aula;
  }

  public async create(data: ICreateAulaDTO): Promise<Aula> {
    // Essa função deve ser executada 1 única vez
    const createAula = this.ormRepository.create(data);
    await this.ormRepository.save(createAula);

    return createAula;
  }

  public async findByTeacherID(id: string): Promise<Aula[] | undefined> {
    const findAula = await this.ormRepository.find({
      teacher_id: id,
    });
    return findAula;
  }

  public async save(data: Aula): Promise<Aula> {
    return this.ormRepository.save(data);
  }

  public async updated(
    id: string,
    data: ICreateAulaDTO,
  ): Promise<Aula | undefined> {
    await this.ormRepository.update(id, data);
    const teste = await this.ormRepository.findOne(id);
    return teste;
  }

  public async deleted(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    const result = 'Deleted Column';
    return result;
  }
}

export default AulaRepository;
