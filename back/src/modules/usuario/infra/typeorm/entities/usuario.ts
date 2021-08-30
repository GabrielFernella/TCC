import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

class Usuario {
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

  @Column({ nullable: true, default: '' })
  key: string;

  @Column({ nullable: true, default: false })
  bloqueio: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Usuario;
