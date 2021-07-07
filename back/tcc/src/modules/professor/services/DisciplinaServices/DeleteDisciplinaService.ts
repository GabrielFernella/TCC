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

  public async execute(
    professor_id: string,
    disciplina_id: string,
  ): Promise<Disciplina> {
    const result = await this.disciplinaRepository.findByID(disciplina_id);

    if (!result) {
      throw new AppError('Disciplina não encontrada');
    }

    if (professor_id !== result.professor_id) {
      throw new AppError('Disciplina não pertence a esse professor');
    }

    result.ativado = false;

    // Ao invés de excluir apenas flegaremos a disciplina como Inativa
    await this.disciplinaRepository.save(result);

    // await this.disciplinaRepository.deleted(disciplina_id);

    return result;
  }
}

export default DeleteDisciplinaService;
