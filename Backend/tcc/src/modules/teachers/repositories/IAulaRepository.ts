import Aula from '../infra/typeorm/entities/Aula';

import ICreateAulaDTO from '../dtos/ICreateAulaDTO';

export default interface IAulaRepository {
  create(data: ICreateAulaDTO): Promise<Aula>;
  findByTeacherID(id: string): Promise<Aula[] | undefined>;
  save(data: Aula): Promise<Aula>;
}
