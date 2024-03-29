import { getRepository, Repository } from 'typeorm';

// import ICreateDisciplinaDTO from '@modules/professor/dtos/ICreateDisciplinaDTO';
import {
  ICreateDisciplinaDTO,
  IAddAvaliacaoDTO,
  IUpdateDisciplinaDTO,
} from '@modules/professor/dtos/IDisciplinaDTO';

import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';

import Disciplina from '../entities/Disciplina';

class DisciplinaRepository implements IDisciplinaRepository {
  private ormRepository: Repository<Disciplina>;

  constructor() {
    this.ormRepository = getRepository(Disciplina);
  }

  public async listDisciplina(): Promise<Disciplina[]> {
    const disciplinas = await this.ormRepository.find();

    return disciplinas;
  }

  public async findByID(
    disciplina_id: string,
  ): Promise<Disciplina | undefined> {
    const disciplina = await this.ormRepository.findOne({
      where: {
        id: disciplina_id,
      },
    });

    return disciplina;
  }

  public async findByIwithDeleted(
    disciplina_id: string,
  ): Promise<Disciplina | undefined> {
    const disciplina = await this.ormRepository.findOne({
      where: {
        id: disciplina_id,
      },
      withDeleted: true,
    });

    return disciplina;
  }

  public async create(data: ICreateDisciplinaDTO): Promise<Disciplina> {
    // Essa função deve ser executada 1 única vez
    const createDisciplina = this.ormRepository.create(data);
    await this.ormRepository.save(createDisciplina);

    return createDisciplina;
  }

  public async findByTeacherID(id: string): Promise<Disciplina[] | undefined> {
    const findAula = await this.ormRepository.find({
      professor_id: id,
    });
    return findAula;
  }

  public async save(data: Disciplina): Promise<Disciplina> {
    return this.ormRepository.save(data);
  }

  public async updated(
    disciplina_id: string,
    data: IUpdateDisciplinaDTO,
  ): Promise<Disciplina | undefined> {
    await this.ormRepository.update(disciplina_id, data);
    const result = await this.ormRepository.findOne(disciplina_id);
    return result;
  }

  public async addAvaliacao(
    data: IAddAvaliacaoDTO,
  ): Promise<Disciplina | undefined> {
    const { disciplina_id } = data;
    await this.ormRepository.update(disciplina_id, {
      mediaAvaliacao: data.mediaAvaliacao,
      qtdAvaliacao: data.qtdAvaliacao,
    });
    const result = await this.ormRepository.findOne(data.disciplina_id);

    return result;
  }

  public async deleted(disciplina_id: string): Promise<string> {
    await this.ormRepository.delete(disciplina_id);

    const result = 'Deleted Column';
    return result;
  }
}

export default DisciplinaRepository;
