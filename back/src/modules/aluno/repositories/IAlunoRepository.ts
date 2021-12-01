import Aluno from '../infra/typeorm/entities/Aluno';

import { ICreateAlunoDTO, IUpdateAlunoDTO } from '../dtos/IAlunoDTO';

export default interface IAlunoRepository {
  findById(id: string): Promise<Aluno | undefined>;
  findByEmail(email: string): Promise<Aluno | undefined>;
  findByCPF(cpf: string): Promise<Aluno | undefined>;
  create(data: ICreateAlunoDTO): Promise<Aluno>;
  update(aluno_id: string, data: IUpdateAlunoDTO): Promise<Aluno | undefined>;
  save(user: Aluno): Promise<Aluno>;
}
