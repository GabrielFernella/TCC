import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

@injectable()
class ListDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(): Promise<Disciplina[]> {
    // Procurando se há um user com o mesmo email
    const findDisciplina = await this.disciplinaRepository.listDisciplina();
    /* if (!findDisciplina) {
      throw new AppError('Disciplina');
    } */

    return findDisciplina;
  }
}

export default ListDisciplinaService;
