import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITeacherRepository from '../repositories/ITeacherRepository';

import IDisponibilidadeRepository from '../repositories/IDisponibilidadeRepository';
import Disponibilidade from '../infra/typeorm/entities/Disponibilidade';

interface IRequest {
  teacher_id: string;
  diaSemana: number;
  horario: number;
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

    // Validando se já existe uma disponibilidade
    /* const tableexists = await this.disponibilidadeProvider.findByTeacherID(
      teacher_id,
    );
    if (tableexists) {
      throw new AppError('Disponibilidade já existe');
    } */

    const cadDisponibilidade = await this.disponibilidadeProvider.create({
      teacher_id,
      diaSemana,
      horario,
    });

    return cadDisponibilidade;
  }
}

export default CreateDisponibilidadeService;
