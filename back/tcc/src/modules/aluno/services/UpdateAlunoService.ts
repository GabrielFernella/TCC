import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/professor/providers/HashProvider/models/IHashProvider';
import IAlunoRepository from '../repositories/IAlunoRepository';
import Aluno from '../infra/typeorm/entities/Aluno';

interface IRequest {
  avatar: string;
  pix: string;
}

@injectable()
class UpdateAlunoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,
  ) {}

  public async execute(
    aluno_id: string,
    { avatar, pix }: IRequest,
  ): Promise<Aluno> {
    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.alunoRepository.findById(aluno_id);

    if (!checkUserExists) {
      throw new AppError('Professor_id não existe');
    }

    const aluno = await this.alunoRepository.update(aluno_id, {
      avatar,
      pix,
    });

    if (!aluno) {
      throw new AppError('Erro ao tentar atualizar seus dados');
    }

    return aluno;
  }
}

export default UpdateAlunoService;
