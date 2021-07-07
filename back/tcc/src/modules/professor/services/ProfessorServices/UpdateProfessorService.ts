import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/professor/providers/HashProvider/models/IHashProvider';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import Professor from '../../infra/typeorm/entities/Professor';

interface IRequest {
  name: string;
  avatar: string;
  pix: string;
  biografia: string;
}

@injectable()
class UpdateProfessorService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,
  ) {}

  public async execute(
    professor_id: string,
    { name, avatar, pix, biografia }: IRequest,
  ): Promise<Professor> {
    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.professorRepository.findById(
      professor_id,
    );

    if (!checkUserExists) {
      throw new AppError('Professor_id não existe');
    }

    const professor = await this.professorRepository.updated(professor_id, {
      name,
      avatar,
      pix,
      biografia,
    });

    if (!professor) {
      throw new AppError('Erro ao tentar atualizar seus dados');
    }

    return professor;
  }
}

export default UpdateProfessorService;
