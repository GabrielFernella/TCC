import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
import CreditCard from './CreditCard';

interface ICard {
  number: string;
  name: string;
  validate: string;
  code: string;
}

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  @Exclude() // não exibe para o response
  password: string;

  @Column()
  avatar: string;

  @Column()
  pix: string;

  @Column()
  ban: string;

  @OneToOne(type => CreditCard, student => Student)
  creditcard: CreditCard;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /* @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
  } */
}

export default Student;
