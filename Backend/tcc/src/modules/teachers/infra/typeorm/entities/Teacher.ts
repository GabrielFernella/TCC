import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

// import uploadConfig from '@config/upload';
import Aula from './Aula';
import Disponibilidade from './Disponibilidade';
import Avaliacao from './Avaliacao';

@Entity('teachers')
class Teacher {
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

  @OneToMany(type => Aula, teacher => Teacher)
  aulas: Aula[];

  @OneToMany(type => Disponibilidade, teacher => Teacher)
  disponibilidade: Disponibilidade[];

  @OneToOne(type => Avaliacao, teacher => Teacher)
  avaliacao: Avaliacao;

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

export default Teacher;
