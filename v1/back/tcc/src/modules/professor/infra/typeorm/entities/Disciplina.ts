import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Professor from './Professor';

@Entity('disciplina')
export default class Disciplina {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column('simple-array')
  tag: string[];

  @Column('text')
  descricao: string;

  @Column()
  valor: number;

  @Column('int')
  qtdAvaliacao: number;

  @Column()
  mediaAvaliacao: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  professor_id: string;

  @ManyToOne(() => Professor, disciplina => Disciplina)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @OneToMany(() => Agendamento, disciplina => Disciplina)
  agendamentos: Agendamento[];
}
