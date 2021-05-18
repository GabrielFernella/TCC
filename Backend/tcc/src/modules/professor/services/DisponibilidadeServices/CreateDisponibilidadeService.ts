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
  }: IRequest): Promise<Disponibilidade[] | undefined> {
    let result: Disponibilidade | undefined;
    // Procurando se há um user com o mesmo email
    const findTeacher = await this.professorRepository.findById(professor_id);
    if (!findTeacher) {
      throw new AppError('Teacher not found');
    }

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

    if (horarioEntrada > horarioSaida) {
      throw new AppError('Horas inválidas');
    }

    const findDay = await this.disponibilidadeRepository.findByDay(
      professor_id,
      diaSemana,
    );

    if (findDay) {
      if (
        horarioEntrada < findDay.horarioEntrada &&
        horarioSaida < findDay.horarioEntrada
      ) {
        result = await this.disponibilidadeRepository.updateDate({
          disponibilidade_id: findDay.id,
          horarioEntrada,
          horarioSaida: findDay.horarioSaida,
        });
      }

      if (
        horarioEntrada > findDay.horarioSaida &&
        horarioSaida > findDay.horarioSaida
      ) {
        result = await this.disponibilidadeRepository.updateDate({
          disponibilidade_id: findDay.id,
          horarioEntrada: findDay.horarioSaida,
          horarioSaida,
        });
      } else {
        throw new AppError('Horas invalid');
      }
    } else {
      result = await this.disponibilidadeRepository.create({
        professor_id,
        diaSemana,
        horarioEntrada,
        horarioSaida,
      });
    }

    const validateDataAndHours = await this.disponibilidadeRepository.findByProfessorID(
      professor_id,
    );

    return validateDataAndHours;
  }
}

export default CreateDisponibilidadeService;

/*
 // Validação temporária
    validateDataAndHours?.map(async valid => {
      if (diaSemana === parseInt(valid.diaSemana, 10)) {
        if (
          (horarioEntrada < parseInt(valid.horarioEntrada, 10) &&
            horarioSaida < parseInt(valid.horarioEntrada, 10)) ||
          (horarioEntrada > parseInt(valid.horarioSaida, 10) &&
            horarioSaida > parseInt(valid.horarioSaida, 10))
        ) {
          await this.disponibilidadeRepository.create({
            professor_id,
            diaSemana,
            horarioEntrada,
            horarioSaida,
          });
          flag = true;
          console.log(professor_id, diaSemana, horarioEntrada, horarioSaida);
        }
      }
    });
*/
