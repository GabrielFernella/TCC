/* eslint-disable import/prefer-default-export */
import { getCustomRepository, Repository } from 'typeorm';
import { Mensagem } from '../infra/typeorm/entities/Mensagem';
import { MensagensRepository } from '../infra/typeorm/repositories/MensagensRepository';

export class MensagemService {
  private mensagemRepository: Repository<Mensagem>;

  constructor() {
    this.mensagemRepository = getCustomRepository(MensagensRepository);
  }

  async create(chatId: string, mensagem: string, isAluno = false) {
    const mensagemAdd = this.mensagemRepository.create({
      chatId,
      mensagem,
      isAluno,
    });

    await this.mensagemRepository.save(mensagemAdd);

    return mensagemAdd;
  }

  async findByChatId(chatId: string) {
    const mensagens = await this.mensagemRepository.find({
      where: { chatId },
      relations: ['chat'],
    });

    return mensagens;
  }
}
