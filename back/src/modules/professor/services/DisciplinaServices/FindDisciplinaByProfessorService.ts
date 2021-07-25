import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

@injectable()
class FindDisciplinaByProfessorService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(professor_id: string): Promise<Disciplina[]> {
    // Procura a disciplina através do Professor_id
    const findDisciplina = await this.disciplinaRepository.findByTeacherID(
      professor_id,
    );
    if (!findDisciplina) {
      throw new AppError('Disciplina não encontrada.');
    }

    return findDisciplina;
  }
}

export default FindDisciplinaByProfessorService;
