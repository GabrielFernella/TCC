import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';

class Aula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teacher_id: string;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column()
  title: string;

  @Column()
  tag: string[];

  @Column()
  description: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Aula;
