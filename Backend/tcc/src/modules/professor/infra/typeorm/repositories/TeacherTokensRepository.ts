import { getRepository, Repository } from 'typeorm';

import ITeacherTokensRepository from '@modules/teachers/repositories/ITeacherTokensRepository';
import TeachersToken from '../entities/TeachersToken';

class TeachersTokensRepository implements ITeacherTokensRepository {
  private ormRepository: Repository<TeachersToken>;

  constructor() {
    this.ormRepository = getRepository(TeachersToken);
  }

  public async findByToken(token: string): Promise<TeachersToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<TeachersToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default TeachersTokensRepository;
