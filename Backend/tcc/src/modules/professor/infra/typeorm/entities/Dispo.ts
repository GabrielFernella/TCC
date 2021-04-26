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

@Entity('dispo')
export default class Disponibilidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'jsonb',
    array: true,
    default: () => 'ARRAY[]::jsonb[]',
    nullable: true,
  })
  date: string[];

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
