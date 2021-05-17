import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '../../repositories/IProfessorRepository';

import IDisponibilidadeRepository from '../../repositories/IDisponibilidadeRepository';
import Disponibilidade from '../../infra/typeorm/entities/Disponibilidade';

interface IRequest {
  professor_id: string;
  diaSemana: number;
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

    if (
      !(
        diaSemana === 0 ||
        diaSemana === 1 ||
        diaSemana === 2 ||
        diaSemana === 3 ||
        diaSemana === 4 ||
        diaSemana === 5 ||
        diaSemana === 6
      )
    ) {
      throw new AppError('Date not permitted');
    }

    const validateDataAndHours = await this.disponibilidadeRepository.findByProfessorID(
      professor_id,
    );

    // Validação temporária
    validateDataAndHours?.map(valid => {
      if (diaSemana === parseInt(valid.diaSemana, 10)) {
        throw new AppError('Date not permitted');
      }
    });

    /* //Validar se os horários não convergem
    validateDataAndHours?.map(valid => {
      if (valid.diaSemana === diaSemana) {
        ...
      }
    }); */

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
