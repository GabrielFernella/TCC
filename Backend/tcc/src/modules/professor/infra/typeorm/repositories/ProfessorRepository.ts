import { getRepository, Repository } from 'typeorm';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';

import ICreateProfessorDTO from '@modules/professor/dtos/ICreateProfessorDTO';
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
}

export default ProfessorRepository;
