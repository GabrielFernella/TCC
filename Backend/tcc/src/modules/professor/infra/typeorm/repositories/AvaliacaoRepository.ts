import { getRepository, Repository } from 'typeorm';

import ICreateAvaliacaoDTO from '@modules/teachers/dtos/ICreateAvaliacaoDTO';
import IAvaliacaoRepository from '@modules/teachers/repositories/IAvaliacaoRepository';

import AppError from '@shared/errors/AppError';
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

  public async findTableID(id: string): Promise<Avaliacao | undefined> {
    const findAvaliacao = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return findAvaliacao;
  }

  public async findByTeacherID(id: string): Promise<Avaliacao> {
    const findAvaliacao = await this.ormRepository.findOne({
      where: {
        teacher_id: id,
      },
    });

    if (!findAvaliacao) {
      throw new AppError('Teacher not found');
    }

    return findAvaliacao;
  }

  public async save(data: Avaliacao): Promise<Avaliacao> {
    return this.ormRepository.save(data);
  }

  public async updates(data: ICreateAvaliacaoDTO): Promise<Avaliacao> {
    const result = await this.ormRepository.findOne({
      where: {
        teacher_id: data.teacher_id,
      },
    });

    if (!result) {
      throw new AppError('Teacher not found');
    }

    await this.ormRepository.update(result.id, {
      qtdaulas: data.qtdaulas,
      qtdavaliacao: data.qtdavaliacao,
      opinion: data.opinion,
    });

    const response = await this.ormRepository.findOne({
      where: {
        teacher_id: data.teacher_id,
      },
    });

    if (!response) {
      throw new AppError('Teacher not found');
    }

    return response;
  }

  public async deletes(id: string): Promise<string> {
    await this.ormRepository.delete({ teacher_id: id });

    const result = 'Deleted Column';
    return result;
  }
}

export default AvaliacaoRepository;
