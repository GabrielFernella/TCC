import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Agendamento } from './Agendamento';
import { AlunoToken } from './AlunoToken';
import { Cartao } from './Cartao';

@Index('UQ_7d72b36d16642eb758366a072c1', ['cpf'], { unique: true })
@Index('UQ_29a948302c3a739d7b20773e182', ['email'], { unique: true })
@Entity('aluno', { schema: 'public' })
export default class Aluno {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'cpf', unique: true })
  cpf: string;

  @Column('character varying', { name: 'email', unique: true })
  email: string;

  @Column('character varying', { name: 'senha' })
  senha: string;

  @Column('character varying', { name: 'avatar' })
  avatar: string;

  @Column('character varying', { name: 'pix' })
  pix: string;

  @Column('boolean', { name: 'bloqueio' })
  bloqueio: boolean;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @OneToMany(() => Agendamento, agendamento => agendamento.aluno)
  agendamentos: Agendamento[];

  @OneToMany(() => AlunoToken, alunoToken => alunoToken.aluno)
  alunoTokens: AlunoToken[];

  @OneToMany(() => Cartao, cartao => cartao.aluno)
  cartaos: Cartao[];
}
