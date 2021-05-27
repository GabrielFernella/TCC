import Aluno from '../infra/typeorm/entities/Aluno';

import { ICreateAlunoDTO } from '../dtos/IAlunoDTO';

export default interface IAlunoRepository {
  findById(id: string): Promise<Aluno | undefined>;
  findByEmail(email: string): Promise<Aluno | undefined>;
  create(data: ICreateAlunoDTO): Promise<Aluno>;
  save(user: Aluno): Promise<Aluno>;
}
