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
import Cartao from './Cartao';

@Entity('pagamento')
export default class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  valor: string;

  @Column()
  estatus: string;

  @Column()
  comprovante: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  cartao_id: string;

  @ManyToOne(type => Cartao, pagamento => Pagamento)
  @JoinColumn({ name: 'cartao_id' })
  cartao: Cartao;
}
