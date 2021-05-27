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

@Entity('aula')
export default class Aula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  tag: string;

  @Column()
  descricao: string;

  @Column('numeric', { name: 'valor' })
  valor: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  professor_id: string;

  @ManyToOne(() => Professor, aula => Aula)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @OneToMany(() => Agendamento, aula => Aula)
  agendamentos: Agendamento[];
}
