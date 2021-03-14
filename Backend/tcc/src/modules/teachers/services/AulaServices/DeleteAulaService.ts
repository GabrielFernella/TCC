import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAulaRepository from '../../repositories/IAulaRepository';
import Aula from '../../infra/typeorm/entities/Aula';

@injectable()
class DeleteAulaService {
  constructor(
    @inject('AulaRepository')
    private aulaRepository: IAulaRepository,
  ) {}

  public async execute(id: string): Promise<Aula> {
    const result = await this.aulaRepository.findByID(id);
    if (!result) {
      throw new AppError('Aula not found');
    }

    await this.aulaRepository.deleted(id);

    return result;
  }
}

export default DeleteAulaService;
