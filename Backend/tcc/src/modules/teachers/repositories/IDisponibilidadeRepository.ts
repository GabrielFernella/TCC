import Disponibilidade from '../infra/typeorm/entities/Disponibilidade';

import ICreateDisponibilidadeDTO from '../dtos/ICreateDisponibilidadeDTO';

export default interface IDisponibilidadeRepository {
  create(data: ICreateDisponibilidadeDTO): Promise<Disponibilidade>;
  save(data: Disponibilidade): Promise<Disponibilidade>;
}
