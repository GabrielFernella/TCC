import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
class UpdateDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(
    id: string,
    { professor_id, titulo, tag, description, value }: IRequest,
  ): Promise<Disciplina> {
    // Procurando se há um user com o mesmo email
    const aula = await this.disciplinaRepository.findByID(id);
    if (!aula) {
      throw new AppError('Aula not found');
    }

    const updateDisciplina = await this.disciplinaRepository.updated(id, {
      professor_id,
      titulo,
      tag,
      description,
      value,
    });

    if (!updateDisciplina) {
      throw new AppError('Disciplina not found');
    }

    return updateDisciplina;
  }
}

export default UpdateDisciplinaService;
