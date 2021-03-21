import AlunoToken from '../infra/typeorm/entities/AlunoToken';

export default interface IAlunoTokensRepository {
  generate(user_id: string): Promise<AlunoToken>;
  findByToken(token: string): Promise<AlunoToken | undefined>;
}
