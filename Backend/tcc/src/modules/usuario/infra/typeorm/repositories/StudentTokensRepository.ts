import { getRepository, Repository } from 'typeorm';

import IStudentsTokensRepository from '@modules/students/repositories/IStudentsTokensRepository';
import StudentToken from '../entities/StudentToken';

class StudentTokensRepository implements IStudentsTokensRepository {
  private ormRepository: Repository<StudentToken>;

  constructor() {
    this.ormRepository = getRepository(StudentToken);
  }

  public async generate(user_id: string): Promise<StudentToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<StudentToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }
}

export default StudentTokensRepository;
