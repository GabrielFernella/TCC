import { getRepository, Repository } from 'typeorm';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';

import {
  ICreateProfessorDTO,
  IUpdateProfessorDTO,
} from '@modules/professor/dtos/IProfessorDTO';
import Professor from '../entities/Professor';

class ProfessorRepository implements IProfessorRepository {
  private ormRepository: Repository<Professor>;

  constructor() {
    this.ormRepository = getRepository(Professor);
  }

  public async findById(id: string): Promise<Professor | undefined> {
    const findId = await this.ormRepository.findOne(id);

    return findId;
  }

  public async findByEmail(email: string): Promise<Professor | undefined> {
    const findEmail = await this.ormRepository.findOne({
      where: { email },
    });

    return findEmail;
  }

  public async create(data: ICreateProfessorDTO): Promise<Professor> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: Professor): Promise<Professor> {
    return this.ormRepository.save(user);
  }

  public async saveKey(id: string, key: string): Promise<void> {
    await this.ormRepository.update(id, { key });
  }

  public async updated(
    professor_id: string,
    data: IUpdateProfessorDTO,
  ): Promise<Professor | undefined> {
    await this.ormRepository.update(professor_id, data);

    const prof = await this.ormRepository.findOne(professor_id);
    return prof;
  }
}

export default ProfessorRepository;
