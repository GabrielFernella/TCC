import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import Student from '@modules/students/infra/typeorm/entities/Student';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teacher_id: string;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column()
  student_id: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  materiaTag: string[];

  @Column()
  nota: number;

  @Column()
  pagamento: boolean;

  @Column()
  notification: string;

  @Column('timestamp with time zone')
  date: Date; // Salva a data e a hora

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
