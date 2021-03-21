import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/aluno/providers/HashProvider/models/IHashProvider';

import Aluno from '../infra/typeorm/entities/Aluno';
import IAlunoRepository from '../repositories/IAlunoRepository';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  avatar: string;
  pix: string;
}

@injectable()
class CreateAlunoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    cpf,
    email,
    password,
    avatar,
    pix,
  }: IRequest): Promise<Aluno> {
    // Procurando se há um user com o mesmo CPF
    const checkUserCpfExists = await this.alunoRepository.findByEmail(cpf);
    if (checkUserCpfExists) {
      throw new AppError('CPF address already used');
    }

    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.alunoRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.alunoRepository.create({
      name,
      cpf,
      email,
      password: hashPassword,
      avatar,
      pix,
      bloqueio: 'false',
    });

    return user;
  }
}

export default CreateAlunoService;
