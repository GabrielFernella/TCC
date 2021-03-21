import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '../../repositories/IProfessorRepository';
import IProfessorTokensRepository from '../../repositories/IProfessorTokensRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('ProfessorTokensRepository')
    private professortokensRepository: IProfessorTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    // Validate token
    const userToken = await this.professortokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    // Find User
    const user = await this.professorRepository.findById(
      userToken.professor_id,
    );
    if (!user) {
      throw new AppError('User does not exists');
    }

    // buscando o horário de requisição do token para validar as 2horas
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.professorRepository.save(user);
  }
}

export default ResetPasswordService;
