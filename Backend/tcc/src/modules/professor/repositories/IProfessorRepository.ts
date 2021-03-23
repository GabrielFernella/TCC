import Professor from '../infra/typeorm/entities/Professor';

import { ICreateProfessorDTO } from '../dtos/IProfessorDTO';

export default interface IProfessorRepository {
  findById(id: string): Promise<Professor | undefined>;
  findByEmail(email: string): Promise<Professor | undefined>;
  create(data: ICreateProfessorDTO): Promise<Professor>;
  save(user: Professor): Promise<Professor>;
}
