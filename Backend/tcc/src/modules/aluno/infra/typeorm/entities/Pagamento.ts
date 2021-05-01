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

export enum StatusPagamento
{
  EmEspera = 0,
  ProcessamentoCartao = 1,
  Recusado = 2,
  ProcessamentoPix = 3,
  PixIncorreto = 4,
  Finalizado = 5
}

@Entity('pagamento')
export default class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  statusPagamento: StatusPagamento = StatusPagamento.EmEspera;

  @Column()
  title: string;

  @Column()
  emailPagador: string;

  @Column()
  valor: number;

  @Column()
  pixDestinatario: string;

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

/*
aluno_id
status
title
emailPagador
valor
*/
