import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Aluno from './Aluno';
import Pagamento from './Pagamento';

@Entity('cartao')
export default class Cartao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numeroCartao: string;

  @Column()
  dataVencimento: string;

  @Column()
  bandeira: string;

  @Column()
  nomeTitular: string;

  @Column()
  cvv: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Pagamento, cartao => Cartao)
  pagamento: Pagamento;

  @Column()
  aluno_id: string;

  @ManyToOne(() => Aluno, cartao => Cartao)
  @JoinColumn({ name: 'aluno_id' })
  aluno: Aluno;
}

/*
@Column()
  professor_id: string;

  @ManyToOne(() => Professor, disponibilidade => Disponibilidade)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

*/
