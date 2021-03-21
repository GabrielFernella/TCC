import { getRepository, Repository } from 'typeorm';

import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';

import ICreatePagamentoDTO from '@modules/aluno/dtos/ICreatePagamentoDTO';
import Pagamento from '../entities/Pagamento';

class PagamentoRepository implements IPagamentoRepository {
  private ormRepository: Repository<Pagamento>;

  constructor() {
    this.ormRepository = getRepository(Pagamento);
  }

  public async findById(id: string): Promise<Pagamento | undefined> {
    const findId = await this.ormRepository.findOne(id);
    return findId;
  }

  public async findByEmailPagador(
    email: string,
  ): Promise<Pagamento | undefined> {
    const findemail = await this.ormRepository.findOne({
      where: { email },
    });

    return findemail;
  }

  public async create(data: ICreatePagamentoDTO): Promise<Pagamento> {
    const pagamento = this.ormRepository.create(data);

    await this.ormRepository.save(pagamento);

    return pagamento;
  }

  public async save(user: Pagamento): Promise<Pagamento> {
    return this.ormRepository.save(user);
  }
}

export default PagamentoRepository;

/*
export default interface IPagamentoRepository {
  findById(id: string): Promise<Aluno | undefined>;
  findByEmail(email: string): Promise<Aluno | undefined>;
  create(data: ICreatePagamentoDTO): Promise<Aluno>;
  save(user: Aluno): Promise<Aluno>;
}

*/
