import { getRepository, Repository } from 'typeorm';

import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';

import {
  ICreateAlunoDTO,
  IUpdateAlunoDTO,
} from '@modules/aluno/dtos/IAlunoDTO';
import Aluno from '../entities/Aluno';

class AlunoRepository implements IAlunoRepository {
  private ormRepository: Repository<Aluno>;

  constructor() {
    this.ormRepository = getRepository(Aluno);
  }

  public async findById(id: string): Promise<Aluno | undefined> {
    const findId = await this.ormRepository.findOne(id);
    return findId;
  }

  public async findByCPF(cpf: string): Promise<Aluno | undefined> {
    const findCPF = await this.ormRepository.findOne({
      where: { cpf },
    });

    return findCPF;
  }

  public async findByEmail(email: string): Promise<Aluno | undefined> {
    const findEmail = await this.ormRepository.findOne({
      where: { email },
    });

    return findEmail;
  }

  public async create(data: ICreateAlunoDTO): Promise<Aluno> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(
    aluno_id: string,
    data: IUpdateAlunoDTO,
  ): Promise<Aluno | undefined> {
    const updated = await this.ormRepository.update(aluno_id, {
      avatar: data.avatar,
      pix: data.pix,
    });

    if (!updated) {
      return undefined;
    }

    const aluno = await this.findById(aluno_id);

    return aluno;
  }

  public async save(user: Aluno): Promise<Aluno> {
    return this.ormRepository.save(user);
  }
}

export default AlunoRepository;
