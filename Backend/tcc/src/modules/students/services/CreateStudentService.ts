import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/teachers/providers/HashProvider/models/IHashProvider';

import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

@injectable()
class CreateStudentService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    cpf,
    email,
    password,
  }: IRequest): Promise<Student> {
    // Procurando se há um user com o mesmo CPF
    const checkUserCpfExists = await this.studentRepository.findByEmail(cpf);
    if (checkUserCpfExists) {
      throw new AppError('CPF address already used');
    }

    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.studentRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.studentRepository.create({
      name,
      cpf,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateStudentService;
