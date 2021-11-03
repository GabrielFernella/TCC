/* eslint-disable import/prefer-default-export */
import { getCustomRepository, Repository } from 'typeorm';
import { Chat } from '../infra/typeorm/entities/Chat';
import { ChatsRepository } from '../infra/typeorm/repositories/ChatsRepository';

export class ChatService {
  private chatRepository: Repository<Chat>;

  constructor() {
    this.chatRepository = getCustomRepository(ChatsRepository);
  }

  async find(agendamentoId: string) {
    const chat = await this.chatRepository.findOne({ agendamentoId });

    return chat;
  }

  async create(alunoId: string, professorId: string, agendamentoId: string) {
    const chat = this.chatRepository.create({
      alunoId,
      professorId,
      agendamentoId,
    });

    await this.chatRepository.save(chat);

    return chat;
  }
}
