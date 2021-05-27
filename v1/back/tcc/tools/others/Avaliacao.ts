import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Professor from './Professor';

@Entity('avaliacao')
export default class Avaliacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  qtdAulas: number;

  @Column()
  mediaAvaliacao: number;

  @Column()
  oponiao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  professor_id: string;

  @OneToOne(() => Professor, avaliacao => Avaliacao)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;
}
