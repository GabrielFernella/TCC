import { getRepository, Repository } from 'typeorm';

import ICreateAvaliacaoDTO from '@modules/teachers/dtos/ICreateAvaliacaoDTO';
import IAvaliacaoRepository from '@modules/teachers/repositories/IAvaliacaoRepository';

import Avaliacao from '../entities/Avaliacao';

class AvaliacaoRepository implements IAvaliacaoRepository {
  private ormRepository: Repository<Avaliacao>;

  constructor() {
    this.ormRepository = getRepository(Avaliacao);
  }

  public async create(data: ICreateAvaliacaoDTO): Promise<Avaliacao> {
    // Essa função deve ser executada 1 única vez
    const createAvaliacao = this.ormRepository.create(data);

    await this.ormRepository.save(createAvaliacao);

    return createAvaliacao;
  }

  public async save(data: Avaliacao): Promise<Avaliacao> {
    return this.ormRepository.save(data);
  }
}

export default AvaliacaoRepository;
