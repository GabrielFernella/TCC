import { getRepository, Repository } from 'typeorm';

import ITeacherTokensRepository from '@modules/professor/repositories/IProfessorTokensRepository';
import ProfessorToken from '../entities/ProfessorToken';

class ProfessorTokensRepository implements ITeacherTokensRepository {
  private ormRepository: Repository<ProfessorToken>;

  constructor() {
    this.ormRepository = getRepository(ProfessorToken);
  }

  public async findByToken(token: string): Promise<ProfessorToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  // Ver se esse está certo
  public async generate(user_id: string): Promise<ProfessorToken> {
    const userToken = this.ormRepository.create({
      professor_id: user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByProfessorID(
    user_id: string,
  ): Promise<ProfessorToken | undefined> {
    const userToken = this.ormRepository.findOne({
      professor_id: user_id,
    });

    return userToken;
  }
}

export default ProfessorTokensRepository;
