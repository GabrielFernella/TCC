import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

@injectable()
class ListDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(): Promise<Disciplina[]> {
    // Listando todas as Disciplinas
    const listDisciplina = await this.disciplinaRepository.listDisciplina();
    /* if (!findDisciplina) {
      throw new AppError('Disciplina');
    } */

    return listDisciplina;
  }
}

export default ListDisciplinaService;
