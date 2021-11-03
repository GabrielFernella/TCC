/* eslint-disable import/prefer-default-export */
import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'alunoId' })
  @ManyToOne(() => Aluno)
  aluno: Aluno;

  @Column()
  alunoId: string;

  @JoinColumn({ name: 'professorId' })
  @ManyToOne(() => Professor)
  professor: Professor;

  @Column()
  professorId: string;

  @JoinColumn({ name: 'agendamentoId' })
  @ManyToOne(() => Agendamento)
  agendamento: Agendamento;

  @Column()
  agendamentoId: string;
}
