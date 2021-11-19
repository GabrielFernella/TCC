import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '../../repositories/IProfessorRepository';
import IProfessorTokensRepository from '../../repositories/IProfessorTokensRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

interface IRequest {
  key: string;
  password: string;
  email: string;
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

  public async execute({ email, key, password }: IRequest): Promise<void> {
    /* const userToken = await this.professortokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    } */

    const user = await this.professorRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    if (user.key !== key) {
      throw new AppError('Chave de validação incorreta.');
    }

    // usar para validar as duas horas antes da data prevista
    // const compareDate = addHours(tokenCreatedAt, 2);

    /* if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    } */

    user.password = await this.hashProvider.generateHash(password);

    await this.professorRepository.save(user);
  }
}

export default ResetPasswordService;
