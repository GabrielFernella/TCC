import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDisponibilidadeRepository from '../../repositories/IDisponibilidadeRepository';
import Disponibilidade from '../../infra/typeorm/entities/Disponibilidade';

@injectable()
class ShowDisponibilidadeService {
  constructor(
    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,
  ) {}

  public async execute(id: string): Promise<Disponibilidade[]> {
    const findTable = await this.disponibilidadeRepository.findByTeacherID(id);

    if (!findTable) {
      throw new AppError('Avaliable not found');
    }

    return findTable;
  }
}

export default ShowDisponibilidadeService;
