import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IAddAvaliacaoDTO } from '@modules/professor/dtos/IDisciplinaDTO';
import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

interface IResponse {
  opinioes: [opiniao: string];
  nota: number;
}

@injectable()
class getAvaliacaoDisciplina {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(disciplina_id: string): Promise<IResponse | []> {
    const getOpinions = await this.agendamentoRepository.listAllAgendamentoDisciplina(
      disciplina_id,
    );

    if (getOpinions === undefined) {
      return [];
    }

    const opinions: [opiniao: string] = ['null'];
    let nota = 0;

    /* getOpinions.map(async item => {
      nota += Number(item.nota);
      opinions.push(item.opiniao);
      return item;
    }); */

    getOpinions.forEach(item => {
      nota += Number(item.nota);
      if (item.opiniao !== '' && item.opiniao !== 'null') {
        opinions.push(item.opiniao);
      }
    });

    opinions.splice(opinions.indexOf('null'), 1);
    const media = nota / opinions.length;

    const object: IResponse = { opinioes: opinions, nota: media };

    return object;
  }
}

export default getAvaliacaoDisciplina;
