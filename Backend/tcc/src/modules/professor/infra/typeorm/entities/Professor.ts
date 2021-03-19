import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Disponibilidade from './Disponibilidade';
import Avaliacao from './Avaliacao';
import Aula from './Aula';

@Entity('professor')
class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  @Exclude() // não exibe para o response
  password: string;

  @Column()
  avatar: string;

  @Column()
  pix: string;

  @Column()
  ban: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  bio: string;

  @OneToMany(() => Agendamento, professor => Professor)
  agendamentos: Agendamento[];

  @OneToMany(() => Aula, professor => Professor)
  aulas: Aula[];

  @OneToMany(() => Disponibilidade, professor => Professor)
  disponibilidades: Disponibilidade[];

  @OneToOne(() => Avaliacao, professor => Professor)
  avaliacao: Avaliacao;
}

export default Professor;
