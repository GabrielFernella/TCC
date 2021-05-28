import { sign } from 'jsonwebtoken'; // Vamos utilizar para autenticar o token
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe'; // injeção de dependências

import AppError from '@shared/errors/AppError';

import Professor from '../../infra/typeorm/entities/Professor';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

@injectable()
class ShowProfessorService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(professor_id: string): Promise<Professor> {
    // Validate email
    const user = await this.professorRepository.findById(professor_id);
    if (!user) {
      throw new AppError('Professor not found', 401);
    }

    return user;
  }
}

export default ShowProfessorService;
