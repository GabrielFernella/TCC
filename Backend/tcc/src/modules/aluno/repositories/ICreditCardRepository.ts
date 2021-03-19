import Student from '../infra/typeorm/entities/CreditCard';

import ICreateStudentDTO from '../dtos/ICreateCreditCardDTO';

export default interface ICreditCardRepository {
  findById(id: string): Promise<Student | undefined>;
  findByEmail(email: string): Promise<Student | undefined>;
  create(data: ICreateStudentDTO): Promise<Student>;
  save(user: Student): Promise<Student>;
}
