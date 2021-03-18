import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDisponibilidadeRepository from '../../repositories/IDisponibilidadeRepository';
import Disponibilidade from '../../infra/typeorm/entities/Disponibilidade';

@injectable()
class DeleteDisponibilidadeService {
  constructor(
    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,
  ) {}

  public async execute(id: string): Promise<Disponibilidade> {
    const result = await this.disponibilidadeRepository.findByID(id);
    if (!result) {
      throw new AppError('Disponibilidade not found');
    }

    await this.disponibilidadeRepository.deleted(id);

    return result;
  }
}

export default DeleteDisponibilidadeService;
