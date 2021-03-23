import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

interface IRequest {
  disciplina_id: string;
  qtdAvaliacao: number;
  mediaAvaliacao: number;
}

@injectable()
class AddAvaliacaoDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(data: IRequest): Promise<Disciplina> {
    // Procurando se há um user com o mesmo email
    const findDisciplina = await this.disciplinaRepository.findByID(
      data.disciplina_id,
    );
    if (!findDisciplina) {
      throw new AppError('Disciplina não encontrada.');
    }
    const updateDisciplina = await this.disciplinaRepository.addAvaliacao(data);

    if (!updateDisciplina) {
      throw new AppError('Disciplina not found');
    }

    return updateDisciplina;
  }
}

export default AddAvaliacaoDisciplinaService;
