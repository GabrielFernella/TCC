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

  public async execute(id: string): Promise<Disciplina> {
    // Procurando se há um user com o mesmo email
    const findDisciplina = await this.disciplinaRepository.findByID(id);
    if (!findDisciplina) {
      throw new AppError('Professor não encontrado.');
    }

    return findDisciplina;
  }
}

export default FindDisciplinaService;
