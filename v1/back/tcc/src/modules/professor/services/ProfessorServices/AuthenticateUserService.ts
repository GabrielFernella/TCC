import { sign } from 'jsonwebtoken'; // Vamos utilizar para autenticar o token
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe'; // injeção de dependências

import AppError from '@shared/errors/AppError';

import IProfessorTokensRepository from '@modules/professor/repositories/IProfessorTokensRepository';
import Professor from '../../infra/typeorm/entities/Professor';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Professor;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Validate email
    const user = await this.professorRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrent email/password combination', 401);
    }

    // Compare password
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // Generate token
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // await this.professorTokensRepository.generate(user.id);

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
