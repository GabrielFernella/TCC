import Student from '../infra/typeorm/entities/Student';

import ICreateStudent from '../dtos/ICreateStudent';

export default interface IStudentRepository {
  findById(id: string): Promise<Student | undefined>;
  findByEmail(email: string): Promise<Student | undefined>;
  create(data: ICreateStudent): Promise<Student>;
  save(user: Student): Promise<Student>;
}
