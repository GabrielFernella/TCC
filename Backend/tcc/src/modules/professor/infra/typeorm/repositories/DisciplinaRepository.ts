import { getRepository, Repository } from 'typeorm';

import ICreateDisciplinaDTO from '@modules/professor/dtos/ICreateDisciplinaDTO';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';

import Disciplina from '../entities/Disciplina';

class DisciplinaRepository implements IDisciplinaRepository {
  private ormRepository: Repository<Disciplina>;

  constructor() {
    this.ormRepository = getRepository(Disciplina);
  }

  public async findByID(id: string): Promise<Disciplina | undefined> {
    const aula = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return aula;
  }

  public async create(data: ICreateDisciplinaDTO): Promise<Disciplina> {
    // Essa função deve ser executada 1 única vez
    const createAula = this.ormRepository.create(data);
    await this.ormRepository.save(createAula);

    return createAula;
  }

  public async findByTeacherID(id: string): Promise<Disciplina[] | undefined> {
    const findAula = await this.ormRepository.find({
      professor_id: id,
    });
    return findAula;
  }

  public async save(data: Disciplina): Promise<Disciplina> {
    return this.ormRepository.save(data);
  }

  public async updated(
    id: string,
    data: ICreateDisciplinaDTO,
  ): Promise<Disciplina | undefined> {
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

export default DisciplinaRepository;
