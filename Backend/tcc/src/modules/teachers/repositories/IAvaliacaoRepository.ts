import Avaliacao from '../infra/typeorm/entities/Avaliacao';

import ICreateAvaliacaoDTO from '../dtos/ICreateAvaliacaoDTO';

export default interface IAvaliacaoRepository {
  create(data: ICreateAvaliacaoDTO): Promise<Avaliacao>;
  save(data: Avaliacao): Promise<Avaliacao>;
}
