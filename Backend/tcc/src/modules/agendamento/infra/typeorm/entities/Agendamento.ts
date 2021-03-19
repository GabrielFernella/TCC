import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';
import Pagamento from '@modules/aluno/infra/typeorm/entities/Pagamento';
import Aula from '@modules/professor/infra/typeorm/entities/Aula';
import Professor from '@modules/professor/infra/typeorm/entities/Professor';

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
  aula_id: string;

  @Column()
  professor_id: string;

  @ManyToOne(() => Aluno, agendamento => Agendamento)
  @JoinColumn([{ name: 'aluno_id', referencedColumnName: 'id' }])
  aluno: Aluno;

  @ManyToOne(() => Pagamento, agendamento => Agendamento)
  @JoinColumn([{ name: 'pagamento_id', referencedColumnName: 'id' }])
  pagamento: Pagamento;

  @ManyToOne(() => Aula, agendamento => Agendamento)
  @JoinColumn([{ name: 'aula_id', referencedColumnName: 'id' }])
  aula: Aula;

  @ManyToOne(() => Professor, agendamento => Agendamento)
  @JoinColumn([{ name: 'professor_id', referencedColumnName: 'id' }])
  professor: Professor;
}
