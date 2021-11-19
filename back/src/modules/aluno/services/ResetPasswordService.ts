import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IAlunoRepository from '../repositories/IAlunoRepository';
import IAlunoTokensRepository from '../repositories/IAlunoTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  key: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('AlunoTokensRepository')
    private alunoTokensRepository: IAlunoTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, key, password }: IRequest): Promise<void> {
    /* const userToken = await this.professortokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    } */

    const user = await this.alunoRepository.findByEmail(email);

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

    await this.alunoRepository.save(user);
  }
}

export default ResetPasswordService;
