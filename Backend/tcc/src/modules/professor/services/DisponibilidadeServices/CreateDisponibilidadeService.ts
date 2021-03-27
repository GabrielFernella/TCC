import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '../../repositories/IProfessorRepository';

import IDisponibilidadeRepository from '../../repositories/IDisponibilidadeRepository';
import Disponibilidade from '../../infra/typeorm/entities/Disponibilidade';

interface IRequest {
  professor_id: string;
  diaSemana: string;
  horarioEntrada: number;
  horarioSaida: number;
}

@injectable()
class CreateDisponibilidadeService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,
  ) {}

  public async execute({
    professor_id,
    diaSemana,
    horarioEntrada,
    horarioSaida,
  }: IRequest): Promise<Disponibilidade> {
    // Procurando se há um user com o mesmo email
    const findTeacher = await this.professorRepository.findById(professor_id);
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
      professor_id,
      diaSemana,
      horarioEntrada,
      horarioSaida,
    });

    return cadDisponibilidade;
  }
}

export default CreateDisponibilidadeService;
