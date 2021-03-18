import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAulaRepository from '../../repositories/IAulaRepository';
import Aula from '../../infra/typeorm/entities/Aula';

@injectable()
class FindAulaService {
  constructor(
    @inject('AulaRepository')
    private aulaRepository: IAulaRepository,
  ) {}

  public async execute(id: string): Promise<Aula> {
    // Procurando se há um user com o mesmo email
    const findAula = await this.aulaRepository.findByID(id);
    if (!findAula) {
      throw new AppError('Teacher not found');
    }

    return findAula;
  }
}

export default FindAulaService;
