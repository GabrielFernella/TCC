import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateAvaliacaoDTO from '@modules/teachers/dtos/ICreateAvaliacaoDTO';
import IAvaliacaoRepository from '../../repositories/IAvaliacaoRepository';
import Avaliacao from '../../infra/typeorm/entities/Avaliacao';

@injectable()
class UpdateAvaliacaoService {
  constructor(
    @inject('AvaliacaoRepository')
    private avaliacaoRepository: IAvaliacaoRepository,
  ) {}

  public async execute(data: ICreateAvaliacaoDTO): Promise<Avaliacao> {
    const findTable = await this.avaliacaoRepository.findByTeacherID(
      data.teacher_id,
    );

    if (!findTable) {
      throw new AppError('Teacher not found');
    }

    const update = await this.avaliacaoRepository.updates(data);
    return update;
  }
}

export default UpdateAvaliacaoService;
