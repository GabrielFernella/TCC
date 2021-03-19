import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAulaRepository from '../../repositories/IAulaRepository';
import Aula from '../../infra/typeorm/entities/Aula';

interface IRequest {
  teacher_id: string;
  tittle: string;
  tag: string[];
  description: string;
  value: number;
}

@injectable()
class UpdateAulaService {
  constructor(
    @inject('AulaRepository')
    private aulaRepository: IAulaRepository,
  ) {}

  public async execute(
    id: string,
    { teacher_id, tittle, tag, description, value }: IRequest,
  ): Promise<Aula> {
    // Procurando se há um user com o mesmo email
    const aula = await this.aulaRepository.findByID(id);
    if (!aula) {
      throw new AppError('Aula not found');
    }

    const updateAula = await this.aulaRepository.updated(id, {
      teacher_id,
      tittle,
      tag,
      description,
      value,
    });

    if (!updateAula) {
      throw new AppError('Aula not found');
    }

    return updateAula;
  }
}

export default UpdateAulaService;
