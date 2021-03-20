import Disciplina from '../infra/typeorm/entities/Disciplina';

import ICreateDisciplinaDTO from '../dtos/ICreateDisciplinaDTO';

export default interface IAulaRepository {
  findByID(id: string): Promise<Disciplina | undefined>;
  create(data: ICreateDisciplinaDTO): Promise<Disciplina>;
  findByTeacherID(id: string): Promise<Disciplina[] | undefined>;
  save(data: Disciplina): Promise<Disciplina>;
  updated(
    id: string,
    data: ICreateDisciplinaDTO,
  ): Promise<Disciplina | undefined>;
  deleted(id: string): Promise<string>;
}
