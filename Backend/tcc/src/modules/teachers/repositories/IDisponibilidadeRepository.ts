import Disponibilidade from '../infra/typeorm/entities/Disponibilidade';

import ICreateDisponibilidadeDTO from '../dtos/ICreateDisponibilidadeDTO';

export default interface IDisponibilidadeRepository {
  create(data: ICreateDisponibilidadeDTO): Promise<Disponibilidade>;
  findByTeacherID(id: string): Promise<Disponibilidade[] | undefined>;
  save(data: Disponibilidade): Promise<Disponibilidade>;
}
