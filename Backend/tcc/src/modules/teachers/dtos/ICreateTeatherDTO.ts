import Aulas from '../infra/typeorm/entities/Aula';

export default interface ICreateTeacherDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  pix: string;
  aulas: Aulas[];
}
