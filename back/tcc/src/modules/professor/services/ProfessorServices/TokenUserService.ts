import { sign } from 'jsonwebtoken'; // Vamos utilizar para autenticar o token
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe'; // injeção de dependências

import AppError from '@shared/errors/AppError';

import IProfessorTokensRepository from '@modules/professor/repositories/IProfessorTokensRepository';
import ProfessorToken from '../../infra/typeorm/entities/ProfessorToken';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

@injectable()
class TokenUserService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('ProfessorTokensRepository')
    private professorTokensRepository: IProfessorTokensRepository,
  ) {}

  public async execute(testToken: string): Promise<string> {
    // console.log(testToken);
    // Procurando o token se está disponível no banco
    const methToken = await this.professorTokensRepository.findByToken(
      testToken,
    );

    if (!methToken) {
      throw new AppError('Token not found', 401);
    }

    return testToken;
  }
}

export default TokenUserService;
