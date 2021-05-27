import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Aluno from './Aluno';

@Entity('aluno_token')
class AlunoToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  aluno_id: string;

  @OneToOne(type => Aluno, alunoToken => AlunoToken)
  @JoinColumn({ name: 'aluno_id' })
  aluno: Aluno;
}

export default AlunoToken;
