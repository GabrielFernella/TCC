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

export enum StatusAula {
  Agendada = 0,
  Confirmada = 1,
  EmProgresso = 2,
  Efetivada = 3,
  Canceladas = 4,
}

@Entity('agendamento')
export default class Agendamento {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column()
  data: Date;

  @Column()
  entrada: number;

  @Column()
  saida: number;

  @Column()
  link: string;

  @Column()
  status: StatusAula = StatusAula.Agendada;

  @Column()
  nota: string;

  @Column('text')
  opiniao: string;

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

  @ManyToOne(() => Aluno)
  @JoinColumn([{ name: 'aluno_id' }])
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
