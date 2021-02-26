import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/teachers/providers/HashProvider/models/IHashProvider';
import ITeacherRepository from '../repositories/ITeacherRepository';
import Teacher from '../infra/typeorm/entities/Teacher';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateTeacherService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeacherRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<Teacher> {}
  // Continue
}

export default CreateTeacherService;
