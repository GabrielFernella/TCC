import { getRepository, Repository } from 'typeorm';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import Student from '../entities/Aluno';

class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async findById(id: string): Promise<Student | undefined> {
    const findid = await this.ormRepository.findOne(id);
    return findid;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const findemail = await this.ormRepository.findOne({
      where: { email },
    });

    return findemail;
  }

  public async create(data: ICreateStudentDTO): Promise<Student> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: Student): Promise<Student> {
    return this.ormRepository.save(user);
  }
}

export default StudentRepository;
