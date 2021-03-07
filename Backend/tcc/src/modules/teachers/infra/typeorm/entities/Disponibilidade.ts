import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

@Entity('disponibilidade')
class Disponibilidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teacher_id: string;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  /* @Column('timestamp with time zone')
  date: Date; // Salva a data e a hora */

  // Vamos computar o dia da seguinte maneira (1,2,3,4,5,6,7) e horários (00 até 23)
  @Column()
  diasemana: number;

  @Column()
  horario: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Disponibilidade;
