import { sign } from 'jsonwebtoken'; // Vamos utilizar para autenticar o token
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe'; // injeção de dependências

import AppError from '@shared/errors/AppError';

import IAlunoTokensRepository from '@modules/aluno/repositories/IAlunoTokensRepository';
import Aluno from '../infra/typeorm/entities/Aluno';
import IAlunoRepository from '../repositories/IAlunoRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Aluno;
  token: string;
}

@injectable()
class AuthenticateAlunoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Validate email
    const user = await this.alunoRepository.findByEmail(email);
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

export default AuthenticateAlunoService;

/* import { sign } from 'jsonwebtoken'; // Vamos utilizar para autenticar o token
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe'; // injeção de dependências

import AppError from '@shared/errors/AppError';

import Aluno from '../infra/typeorm/entities/Aluno';
import IAlunoRepository from '../repositories/IAlunoRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IAlunoTokensRepository from '../repositories/IAlunoTokensRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Aluno;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('AlunoTokensRepository')
    private alunoTokensRepository: IAlunoTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Validate email
    const user = await this.alunoRepository.findByEmail(email);
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

    await this.alunoTokensRepository.generate(user.id);

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
*/
