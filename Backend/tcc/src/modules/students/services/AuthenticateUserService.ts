import { sign } from 'jsonwebtoken'; // Vamos utilizar para autenticar o token
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe'; // injeção de dependências

import AppError from '@shared/errors/AppError';

import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Student;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Validate email
    const user = await this.studentsRepository.findByEmail(email);
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

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
