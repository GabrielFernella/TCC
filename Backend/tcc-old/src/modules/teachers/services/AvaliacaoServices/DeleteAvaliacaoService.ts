import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAvaliacaoRepository from '../../repositories/IAvaliacaoRepository';

@injectable()
class DeleteAvaliacaoService {
  constructor(
    @inject('AvaliacaoRepository')
    private avaliacaoRepository: IAvaliacaoRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    const findTable = await this.avaliacaoRepository.findByTeacherID(id);

    if (!findTable) {
      throw new AppError('Teacher not found');
    }

    const deleted = await this.avaliacaoRepository.deletes(id);
    return deleted;
  }
}

export default DeleteAvaliacaoService;
