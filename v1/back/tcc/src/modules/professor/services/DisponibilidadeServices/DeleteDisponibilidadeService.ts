import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDisponibilidadeRepository from '../../repositories/IDisponibilidadeRepository';
import Disponibilidade from '../../infra/typeorm/entities/Disponibilidade';

@injectable()
class DeleteDisponibilidadeService {
  constructor(
    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,
  ) {}

  public async execute(professor_id: string,disponibilidade_id: string): Promise<Disponibilidade> {


    const result = await this.disponibilidadeRepository.findByID(disponibilidade_id);

    //Regras de negócio
    if (!result) {
      throw new AppError('Disponibilidade not found');
    }

    if(result.professor_id != professor_id){
      throw new AppError('Permissão não autorizada, somente o professor desta disponibilidade pode remover essa disponibilidade.');
    }

    await this.disponibilidadeRepository.deleted(disponibilidade_id);

    return result;
  }
}

export default DeleteDisponibilidadeService;
