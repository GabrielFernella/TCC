import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/teachers/providers/HashProvider/models/IHashProvider';
import ITeacherRepository from '../repositories/ITeacherRepository';
import Teacher from '../infra/typeorm/entities/Teacher';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  avatar: string;
  pix: string;
  bio: string;
}

@injectable()
class CreateTeacherService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,

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
    bio,
  }: IRequest): Promise<Teacher> {
    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.teacherRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.teacherRepository.create({
      name,
      cpf,
      email,
      password: hashPassword,
      avatar,
      pix,
      bio,
      ban: 0,
    });

    return user;
  }
}

export default CreateTeacherService;
