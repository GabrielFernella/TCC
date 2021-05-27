import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IAddAvaliacaoDTO } from '@modules/professor/dtos/IDisciplinaDTO';
import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

@injectable()
class AddAvaliacaoDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(
    professor_id: string,
    data: IAddAvaliacaoDTO,
  ): Promise<Disciplina> {
    // Procurando se há essa disciplina

    const findDisciplina = await this.disciplinaRepository.findByID(
      data.disciplina_id,
    );

    if (!findDisciplina) {
      throw new AppError('Disciplina não encontrada.');
    }
    if (findDisciplina.professor_id !== professor_id) {
      throw new AppError(
        'Esse professor não pertence a disciplina selecionada.',
      );
    }
    // Chamando a repository
    const updateDisciplina = await this.disciplinaRepository.addAvaliacao(data);

    if (!updateDisciplina) {
      throw new AppError('Disciplina not found');
    }

    return updateDisciplina;
  }
}

export default AddAvaliacaoDisciplinaService;
