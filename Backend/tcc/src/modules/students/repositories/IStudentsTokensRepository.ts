import StudentToken from '../infra/typeorm/entities/StudentToken';

export default interface IStudentTokensRepository {
  generate(user_id: string): Promise<StudentToken>;
  findByToken(token: string): Promise<StudentToken | undefined>;
}
