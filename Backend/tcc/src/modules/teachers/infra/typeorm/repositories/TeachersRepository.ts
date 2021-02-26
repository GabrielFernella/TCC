import { getRepository, Repository } from 'typeorm';

import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';

import ICreateTeatherDTO from '@modules/teachers/dtos/ICreateTeatherDTO';
import Teacher from '../entities/Teacher';

class TeachersRepository implements ITeacherRepository {
  private ormRepository: Repository<Teacher>;

  constructor() {
    this.ormRepository = getRepository(Teacher);
  }

  public async findById(id: string): Promise<Teacher | undefined> {
    const findId = await this.ormRepository.findOne(id);

    return findId;
  }

  public async findByEmail(email: string): Promise<Teacher | undefined> {
    const findEmail = await this.ormRepository.findOne({
      where: { email },
    });

    return findEmail;
  }

  public async create(data: ICreateTeatherDTO): Promise<Teacher> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: Teacher): Promise<Teacher> {
    return this.ormRepository.save(user);
  }
}

export default TeachersRepository;
