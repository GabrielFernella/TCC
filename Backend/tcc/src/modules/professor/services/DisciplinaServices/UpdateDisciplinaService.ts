import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IUpdateDisciplinaDTO } from '@modules/professor/dtos/IDisciplinaDTO';
import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
// import Disciplina from '../../infra/typeorm/entities/Disciplina';

interface IRequest {
  professor_id: string;
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
    disciplina_id: string,
    { professor_id, titulo, tag, descricao, valor }: IRequest,
  ): Promise<IUpdateDisciplinaDTO> {
    // Procurando se há um user com o mesmo email
    const aula = await this.disciplinaRepository.findByID(id);
    if (!aula) {
      throw new AppError('Aula not found');
    }

    const updateDisciplina = await this.disciplinaRepository.updated(
      disciplina_id,
      {
        professor_id,
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
