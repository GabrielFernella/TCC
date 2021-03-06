import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

@injectable()
class FindDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(disciplina_id: string): Promise<Disciplina> {
    // Procura a disciplina através do ID
    const findDisciplina = await this.disciplinaRepository.findByID(
      disciplina_id,
    );
    if (!findDisciplina) {
      throw new AppError('Disciplina não encontrada.');
    }

    return findDisciplina;
  }
}

export default FindDisciplinaService;
