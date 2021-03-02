import Teacher from '../infra/typeorm/entities/Teacher';
import Disponibilidade from '../infra/typeorm/entities/Disponibilidade';
import Aula from '../infra/typeorm/entities/Aula';

import ICreateTeacherDTO from '../dtos/ICreateTeatherDTO';

export default interface ITeacherRepository {
  findById(id: string): Promise<Teacher | undefined>;
  findByEmail(email: string): Promise<Teacher | undefined>;
  create(data: ICreateTeacherDTO): Promise<Teacher>;
  save(user: Teacher): Promise<Teacher>;
}
