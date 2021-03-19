import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAvaliacaoRepository from '../../repositories/IAvaliacaoRepository';
import Avaliacao from '../../infra/typeorm/entities/Avaliacao';

@injectable()
class FindAvaliacaoService {
  constructor(
    @inject('AvaliacaoRepository')
    private avaliacaoRepository: IAvaliacaoRepository,
  ) {}

  public async execute(id: string): Promise<Avaliacao> {
    const findTable = await this.avaliacaoRepository.findByTeacherID(id);

    if (!findTable) {
      throw new AppError('Avaliable not found');
    }

    return findTable;
  }
}

export default FindAvaliacaoService;
