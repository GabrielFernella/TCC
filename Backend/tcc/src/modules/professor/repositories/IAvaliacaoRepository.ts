import Avaliacao from '../infra/typeorm/entities/Avaliacao';

import ICreateAvaliacaoDTO from '../dtos/ICreateAvaliacaoDTO';

export default interface IAvaliacaoRepository {
  create(data: ICreateAvaliacaoDTO): Promise<Avaliacao>;
  findTableID(id: string): Promise<Avaliacao | undefined>;
  findByTeacherID(id: string): Promise<Avaliacao | undefined>;
  save(data: Avaliacao): Promise<Avaliacao>;
  updates(data: ICreateAvaliacaoDTO): Promise<Avaliacao>;
  deletes(id: string): Promise<string>;
}
