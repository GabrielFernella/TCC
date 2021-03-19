import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import { Exclude } from 'class-transformer';
import Cartao from './Cartao';
import AlunoToken from './AlunoToken';

@Entity('aluno')
class Aluno {
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

  @OneToMany(() => Agendamento, aluno => Aluno)
  agendamentos: Agendamento[];

  @OneToOne(() => AlunoToken, aluno => Aluno)
  alunoTokens: AlunoToken;

  @OneToOne(() => Cartao, aluno => Aluno)
  cartaos: Cartao;
}

export default Aluno;
