import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Aluno from './Aluno';

@Entity('pagamento')
export default class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  title: string;

  @Column()
  emailPagador: string;

  @Column()
  valor: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  aluno_id: string;

  @ManyToOne(type => Aluno, pagamento => Pagamento)
  @JoinColumn({ name: 'aluno_id' })
  aluno: Aluno;

  @OneToOne(type => Agendamento, pagamento => Pagamento)
  agendamento: Agendamento;
}
