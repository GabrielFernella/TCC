/* eslint-disable import/prefer-default-export */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from './Chat';

@Entity('mensagens')
export class Mensagem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn()
  dataMensagem: Date;

  @Column()
  mensagem: string;

  @JoinColumn({ name: 'chatId' })
  @ManyToOne(() => Chat)
  chat: Chat;

  @Column()
  chatId: string;

  @Column()
  isAluno: boolean;
}
