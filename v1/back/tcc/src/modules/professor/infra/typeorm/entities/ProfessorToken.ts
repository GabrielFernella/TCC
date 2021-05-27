import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Professor from './Professor';

@Entity('professor_token')
class ProfessorToken {
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
  professor_id: string;

  @OneToOne(type => Professor, professorToken => ProfessorToken)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;
}

export default ProfessorToken;
