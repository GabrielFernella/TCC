import Professor from '../infra/typeorm/entities/Professor';

import {
  ICreateProfessorDTO,
  IUpdateProfessorDTO,
} from '../dtos/IProfessorDTO';

export default interface IProfessorRepository {
  findById(id: string): Promise<Professor | undefined>;
  findByEmail(email: string): Promise<Professor | undefined>;
  findByCPF(cpf: string): Promise<Professor | undefined>;
  create(data: ICreateProfessorDTO): Promise<Professor>;
  updated(
    professor_id: string,
    data: IUpdateProfessorDTO,
  ): Promise<Professor | undefined>;
  save(user: Professor): Promise<Professor>;
  saveKey(id: string, key: string): Promise<void>;
}
