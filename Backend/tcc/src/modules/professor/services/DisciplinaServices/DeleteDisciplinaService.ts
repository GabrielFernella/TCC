import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

@injectable()
class DeleteDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(id: string): Promise<Disciplina> {
    const result = await this.disciplinaRepository.findByID(id);
    if (!result) {
      throw new AppError('Disciplina não encontrada');
    }

    await this.disciplinaRepository.deleted(id);

    return result;
  }
}

export default DeleteDisciplinaService;
