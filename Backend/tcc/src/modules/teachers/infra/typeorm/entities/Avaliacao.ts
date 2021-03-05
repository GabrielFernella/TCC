import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

@Entity('avaliacoes')
class Avaliacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teacher_id: string;

  @OneToOne(type => Teacher, avaliacao => Avaliacao)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column()
  qtdaulas: number;

  @Column()
  qtdavaliacao: number;

  @Column()
  opinion: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Avaliacao;
