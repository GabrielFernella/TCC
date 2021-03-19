import Student from '../infra/typeorm/entities/Student';

import ICreateStudentDTO from '../dtos/ICreateStudentDTO';

export default interface IStudentRepository {
  findById(id: string): Promise<Student | undefined>;
  findByEmail(email: string): Promise<Student | undefined>;
  create(data: ICreateStudentDTO): Promise<Student>;
  save(user: Student): Promise<Student>;
}
