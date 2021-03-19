import Aula from '../infra/typeorm/entities/Aula';

import ICreateAulaDTO from '../dtos/ICreateAulaDTO';

export default interface IAulaRepository {
  findByID(id: string): Promise<Aula | undefined>;
  create(data: ICreateAulaDTO): Promise<Aula>;
  findByTeacherID(id: string): Promise<Aula[] | undefined>;
  save(data: Aula): Promise<Aula>;
  updated(id: string, data: ICreateAulaDTO): Promise<Aula | undefined>;
  deleted(id: string): Promise<string>;
}
