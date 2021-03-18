import TeacherToken from '../infra/typeorm/entities/TeachersToken';

export default interface IStudentTokensRepository {
  generate(user_id: string): Promise<TeacherToken>;
  findByToken(token: string): Promise<TeacherToken | undefined>;
}
