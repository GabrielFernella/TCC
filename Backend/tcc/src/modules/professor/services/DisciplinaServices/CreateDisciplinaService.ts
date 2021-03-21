import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '../../repositories/IProfessorRepository';

import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

interface IRequest {
  professor_id: string;
  titulo: string;
  tag: string[];
  description: string;
  value: number;
}

@injectable()
class CreateDisciplinaService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute({
    professor_id,
    titulo,
    tag,
    description,
    value,
  }: IRequest): Promise<Disciplina> {
    // Procurando se há um user com o mesmo email
    const findTeacher = await this.professorRepository.findById(professor_id);
    if (!findTeacher) {
      throw new AppError('Professor não encontrado.');
    }

    const cadDisciplina = await this.disciplinaRepository.create({
      professor_id,
      titulo,
      tag,
      description,
      value,
    });

    return cadDisciplina;
  }
}

export default CreateDisciplinaService;
