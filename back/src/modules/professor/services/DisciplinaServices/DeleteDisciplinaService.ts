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
    const disciplina = await this.disciplinaRepository.findByID(disciplina_id);

    if (!disciplina) {
      throw new AppError('Disciplina não encontrada');
    }

    if (professor_id !== disciplina.professor_id) {
      throw new AppError('Disciplina não pertence a esse professor');
    }

    disciplina.ativado = false;
    disciplina.deleted = true;
    disciplina.deleted_at = new Date();

    // Ao invés de excluir apenas flegaremos a disciplina como Inativa
    await this.disciplinaRepository.save(disciplina);

    // await this.disciplinaRepository.deleted(disciplina_id);

    return disciplina;
  }
}

export default DeleteDisciplinaService;
