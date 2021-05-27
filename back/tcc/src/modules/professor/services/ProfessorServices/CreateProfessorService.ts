import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/professor/providers/HashProvider/models/IHashProvider';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import Professor from '../../infra/typeorm/entities/Professor';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  avatar: string;
  pix: string;
  biografia: string;
}

@injectable()
class CreateProfessorService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

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
    biografia,
  }: IRequest): Promise<Professor> {
    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.professorRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.professorRepository.create({
      name,
      cpf,
      email,
      password: hashPassword,
      avatar,
      pix,
      biografia,
    });

    return user;
  }
}

export default CreateProfessorService;
