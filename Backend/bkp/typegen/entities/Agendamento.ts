import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Aluno } from './Aluno';
import { Aula } from './Aula';
import { Pagamento } from './Pagamento';
import { Professor } from './Professor';

@Entity('agendamento', { schema: 'public' })
export default class Agendamento {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'data' })
  data: string;

  @Column('character varying', { name: 'link' })
  link: string;

  @Column('character varying', { name: 'Nota' })
  nota: string;

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

  @ManyToOne(() => Aluno, aluno => aluno.agendamentos, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'aluno_id', referencedColumnName: 'id' }])
  aluno: Aluno;

  @ManyToOne(() => Aula, aula => aula.agendamentos, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'aula_id', referencedColumnName: 'id' }])
  aula: Aula;

  @ManyToOne(() => Pagamento, pagamento => pagamento.agendamentos, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'pagamento_id', referencedColumnName: 'id' }])
  pagamento: Pagamento;

  @ManyToOne(() => Professor, professor => professor.agendamentos, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'professor_id', referencedColumnName: 'id' }])
  professor: Professor;
}
