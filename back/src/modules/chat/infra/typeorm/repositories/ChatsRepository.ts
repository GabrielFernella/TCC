import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/Chat';

@EntityRepository(Chat)
export class ChatsRepository extends Repository<Chat> {}
