import { EntityRepository, Repository } from 'typeorm';
import { Mensagem } from '../entities/Mensagem';

@EntityRepository(Mensagem)
export class MensagensRepository extends Repository<Mensagem> {}
