import { getRepository, Repository } from 'typeorm';

import { ICreateDisponibilidadeDTO } from '@modules/professor/dtos/IDisponibilidadeDTO';
import IDisponibilidadeRepository from '@modules/professor/repositories/IDisponibilidadeRepository';

import AppError from '@shared/errors/AppError';
import Disponibilidade from '../entities/Disponibilidade';

class DisponibilidadeRepository implements IDisponibilidadeRepository {
  private ormRepository: Repository<Disponibilidade>;

  constructor() {
    this.ormRepository = getRepository(Disponibilidade);
  }

  public async create(
    data: ICreateDisponibilidadeDTO,
  ): Promise<Disponibilidade> {
    // Essa função deve ser executada 1 única vez
    const disponibilidade = this.ormRepository.create(data);

    await this.ormRepository.save(disponibilidade);

    return disponibilidade;
  }

  public async findByID(id: string): Promise<Disponibilidade | undefined> {
    const findDisponibilidade = await this.ormRepository.findOne({
      where: { id },
    });
    return findDisponibilidade;
  }

  public async findByTeacherID(
    id: string,
  ): Promise<Disponibilidade[] | undefined> {
    const findDisponibilidade = await this.ormRepository.find({
      where: { teacher_id: id },
    });
    return findDisponibilidade;
  }

  public async save(data: Disponibilidade): Promise<Disponibilidade> {
    return this.ormRepository.save(data);
  }

  public async deleted(id: string): Promise<string> {
    const deleted = await this.ormRepository.delete(id);

    if (!deleted) {
      throw new AppError('Disponibilidade not found');
    }
    const result = 'Deleted';
    return result;
  }
}

export default DisponibilidadeRepository;
