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
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import Aluno from './Aluno';

// fiz alteração aqui
export enum StatusPagamento {
  EmEspera = 0,
  Processando = 1,
  Negado = 2,
  Cancelado = 3,
  Concluido = 4,
}

@Entity('pagamento')
export default class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  statusPagamento: StatusPagamento = StatusPagamento.EmEspera;

  @Column()
  title: string;

  @Column({ type: 'numeric' })
  valor: number;

  @Column()
  emailPagador: string;

  @Column()
  pixDestinatario: string;

  @Column({ nullable: true })
  key: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  aluno_id: string;

  @Column()
  professor_id: string;

  @ManyToOne(type => Aluno, pagamento => Pagamento)
  @JoinColumn({ name: 'aluno_id' })
  aluno: Aluno;

  @ManyToOne(type => Professor, pagamento => Pagamento)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @OneToOne(type => Agendamento, pagamento => Pagamento)
  agendamento: Agendamento;
}

/*
aluno_id
status
title
emailPagador
valor
*/
