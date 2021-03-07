import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITeacherRepository from '../repositories/ITeacherRepository';

import IDisponibilidadeRepository from '../repositories/IDisponibilidadeRepository';
import Disponibilidade from '../infra/typeorm/entities/Disponibilidade';

interface IRequest {
  teacher_id: string;
  diaSemana: string;
  horario: string;
}

@injectable()
class CreateDisponibilidadeService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,

    @inject('DisponibilidadeProvider')
    private disponibilidadeProvider: IDisponibilidadeRepository,
  ) {}

  public async execute({
    teacher_id,
    diaSemana,
    horario,
  }: IRequest): Promise<Disponibilidade> {
    // Procurando se há um user com o mesmo email
    const findTeacher = await this.teacherRepository.findById(teacher_id);
    if (findTeacher) {
      throw new AppError('Teacher not found');
    }

    const cadDisponibilidade = await this.disponibilidadeProvider.create({
      teacher_id,
      diaSemana,
      horario,
    });

    return cadDisponibilidade;
  }
}

export default CreateDisponibilidadeService;
