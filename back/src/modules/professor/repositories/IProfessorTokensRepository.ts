import TeacherToken from '../infra/typeorm/entities/ProfessorToken';

export default interface IProfessorTokensRepository {
  generate(user_id: string): Promise<TeacherToken>;
  findByToken(token: string): Promise<TeacherToken | undefined>;
  findByProfessorID(token: string): Promise<TeacherToken | undefined>;
}
