import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITeacherRepository from '../../repositories/ITeacherRepository';

import IDisponibilidadeRepository from '../../repositories/IDisponibilidadeRepository';
import Disponibilidade from '../../infra/typeorm/entities/Disponibilidade';

interface IRequest {
  teacher_id: string;
  diaSemana: number;
  horarioentrada: number;
  horariosaida: number;
}

@injectable()
class CreateDisponibilidadeService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,

    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,
  ) {}

  public async execute({
    teacher_id,
    diaSemana,
    horarioentrada,
    horariosaida,
  }: IRequest): Promise<Disponibilidade> {
    // Procurando se há um user com o mesmo email
    const findTeacher = await this.teacherRepository.findById(teacher_id);
    if (!findTeacher) {
      throw new AppError('Teacher not found');
    }

    // Validando se já existe uma disponibilidade
    /* const tableexists = await this.disponibilidadeProvider.findByTeacherID(
      teacher_id,
    );
    if (tableexists) {
      throw new AppError('Disponibilidade já existe');
    } */

    const cadDisponibilidade = await this.disponibilidadeRepository.create({
      teacher_id,
      diaSemana,
      horarioentrada,
      horariosaida,
    });

    return cadDisponibilidade;
  }
}

export default CreateDisponibilidadeService;
