import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAlunoRepository from '../repositories/IAlunoRepository';
import Aluno from '../infra/typeorm/entities/Aluno';

@injectable()
class ShowAlunoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,
  ) {}

  public async execute(aluno_id: string): Promise<Aluno> {
    const aluno = await this.alunoRepository.findById(aluno_id);

    if (!aluno) {
      throw new AppError('Aluno não encontrado');
    }

    return aluno;
  }
}

export default ShowAlunoService;
