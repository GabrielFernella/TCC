import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Professor from './Professor';

@Entity('disponibilidade')
export default class Disponibilidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  diaSemana: number;

  @Column('int')
  horarioEntrada: number;

  @Column('int')
  horarioSaida: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  professor_id: string;

  @ManyToOne(() => Professor, disponibilidade => Disponibilidade)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;
}
