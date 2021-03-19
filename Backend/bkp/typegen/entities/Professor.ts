import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Agendamento } from './Agendamento';
import { Aula } from './Aula';
import { Avaliacao } from './Avaliacao';
import { Disponibilidade } from './Disponibilidade';
import { ProfessorToken } from './ProfessorToken';

@Index('UQ_0dda20c903dc09e002e9cf1b487', ['cpf'], { unique: true })
@Index('UQ_492e744e6333071da912c7d651b', ['email'], { unique: true })
@Entity('professor', { schema: 'public' })
export default class Professor {
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

  @Column('character varying', { name: 'bio' })
  bio: string;

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

  @OneToMany(() => Agendamento, agendamento => agendamento.professor)
  agendamentos: Agendamento[];

  @OneToMany(() => Aula, aula => aula.professor)
  aulas: Aula[];

  @OneToMany(() => Avaliacao, avaliacao => avaliacao.professor)
  avaliacaos: Avaliacao[];

  @OneToMany(
    () => Disponibilidade,
    disponibilidade => disponibilidade.professor,
  )
  disponibilidades: Disponibilidade[];

  @OneToMany(() => ProfessorToken, professorToken => professorToken.professor)
  professorTokens: ProfessorToken[];
}
