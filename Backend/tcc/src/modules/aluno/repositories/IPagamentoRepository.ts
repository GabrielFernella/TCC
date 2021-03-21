import Aluno from '../infra/typeorm/entities/Aluno';

import ICreateStudentDTO from '../dtos/ICreateCreditCardDTO';

export default interface IPagamentoRepository {
  findById(id: string): Promise<Aluno | undefined>;
  findByEmail(email: string): Promise<Aluno | undefined>;
  create(data: ICreateStudentDTO): Promise<Aluno>;
  save(user: Aluno): Promise<Aluno>;
}
