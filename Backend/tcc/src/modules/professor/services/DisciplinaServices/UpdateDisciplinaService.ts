import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IUpdateDisciplinaDTO } from '@modules/professor/dtos/IDisciplinaDTO';
import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
// import Disciplina from '../../infra/typeorm/entities/Disciplina';

interface IRequest {
  disciplina_id: string;
  titulo: string;
  tag: string[];
  descricao: string;
  valor: string;
}

@injectable()
class UpdateDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,
  ) {}

  public async execute(
    professor_id: string,
    { disciplina_id, titulo, tag, descricao, valor }: IRequest,
  ): Promise<IUpdateDisciplinaDTO> {
    // Procurando se há um user com o mesmo email
    const disciplina = await this.disciplinaRepository.findByID(disciplina_id);
    if (!disciplina) {
      throw new AppError('Disciplina não encontrada.');
    }
    if (disciplina.professor_id !== professor_id) {
      throw new AppError('Professor não pertence a essa disciplina.');
    }

    const updateDisciplina = await this.disciplinaRepository.updated(
      disciplina_id,
      {
        titulo,
        tag,
        descricao,
        valor,
      },
    );

    if (!updateDisciplina) {
      throw new AppError('Disciplina not found');
    }

    return updateDisciplina;
  }
}

export default UpdateDisciplinaService;
