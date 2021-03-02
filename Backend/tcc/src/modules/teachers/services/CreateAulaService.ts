import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITeacherRepository from '../repositories/ITeacherRepository';

import IAulaRepository from '../repositories/IAulaRepository';
import Aula from '../infra/typeorm/entities/Aula';

interface IRequest {
  teacher_id: string;
  tittle: string;
  tag: string[];
  description: string;
  value: number;
}

@injectable()
class CreateAulaService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeacherRepository,

    @inject('AulaProvider')
    private aulaProvider: IAulaRepository,
  ) {}

  public async execute({
    teacher_id,
    tittle,
    tag,
    description,
    value,
  }: IRequest): Promise<Aula> {
    // Procurando se há um user com o mesmo email
    const findTeacher = await this.teachersRepository.findById(teacher_id);
    if (findTeacher) {
      throw new AppError('Teacher not found');
    }

    const cadAula = await this.aulaProvider.create({
      teacher_id,
      tittle,
      tag,
      description,
      value,
    });

    return cadAula;
  }
}

export default CreateAulaService;
