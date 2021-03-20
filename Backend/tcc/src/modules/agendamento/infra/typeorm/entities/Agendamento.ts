import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';

import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';
import Pagamento from '@modules/aluno/infra/typeorm/entities/Pagamento';
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import Disciplina from '@modules/professor/infra/typeorm/entities/Disciplina';

@Entity('agendamento')
export default class Agendamento {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column()
  data: string;

  @Column()
  link: string;

  @Column('character varying', { name: 'Nota' })
  nota: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  aluno_id: string;

  @Column()
  pagamento_id: string;

  @Column()
  disciplina_id: string;

  @Column()
  professor_id: string;

  @ManyToOne(() => Aluno, agendamento => Agendamento)
  @JoinColumn([{ name: 'aluno_id', referencedColumnName: 'id' }])
  aluno: Aluno;

  @OneToOne(() => Pagamento, agendamento => Agendamento)
  @JoinColumn([{ name: 'pagamento_id', referencedColumnName: 'id' }])
  pagamento: Pagamento;

  @ManyToOne(() => Disciplina, agendamento => Agendamento)
  @JoinColumn([{ name: 'disciplina_id', referencedColumnName: 'id' }])
  disciplina: Disciplina;

  @ManyToOne(() => Professor, agendamento => Agendamento)
  @JoinColumn([{ name: 'professor_id', referencedColumnName: 'id' }])
  professor: Professor;
}
