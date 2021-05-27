import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Dispo from '../entities/Dispo';

interface IDispo {
  professor_id: string;
  data: {
    dia: string;
    entrada: string;
    saida: string;
  };
}

class DispoRepository {
  private ormRepository: Repository<Dispo>;

  constructor() {
    this.ormRepository = getRepository(Dispo);
  }

  public async create(res: IDispo): Promise<Dispo> {
    // Essa função deve ser executada 1 única vez
    const disponibilidade = this.ormRepository.create(res);
    await this.ormRepository.save(disponibilidade);

    return disponibilidade;
  }

  public async findByID(id: string): Promise<Dispo | undefined> {
    const findDisponibilidade = await this.ormRepository.findOne({
      where: { id },
    });
    return findDisponibilidade;
  }

  public async findByProfessorID(id: string): Promise<Dispo[] | undefined> {
    const findDisponibilidade = await this.ormRepository.find({
      where: { professor_id: id },
    });
    return findDisponibilidade;
  }

  public async save(res: IDispo): Promise<Dispo> {
    return this.ormRepository.save(res);
  }

  public async deleted(id: string): Promise<string> {
    const deleted = await this.ormRepository.delete(id);

    // Fazendo um teste de validação
    if (!deleted.raw == null) {
      throw new AppError('Disponibilidade not found');
    }
    const result = 'Deleted';
    return result;
  }
}

export default DispoRepository;
