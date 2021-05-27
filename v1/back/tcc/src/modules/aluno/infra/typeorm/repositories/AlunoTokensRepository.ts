import { getRepository, Repository } from 'typeorm';

import IAlunoTokensRepository from '@modules/aluno/repositories/IAlunoTokensRepository';
import AlunoToken from '../entities/AlunoToken';

class StudentTokensRepository implements IAlunoTokensRepository {
  private ormRepository: Repository<AlunoToken>;

  constructor() {
    this.ormRepository = getRepository(AlunoToken);
  }

  public async findByToken(token: string): Promise<AlunoToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<AlunoToken> {
    const userToken = this.ormRepository.create({
      aluno_id: user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default StudentTokensRepository;
