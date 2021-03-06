/* import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Professor from './Professor';

// @Entity('disponibilidades')
export default class Disponibilidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  segunda: number;

  @Column()
  horarioEntrada: number;

  @Column()
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
*/
