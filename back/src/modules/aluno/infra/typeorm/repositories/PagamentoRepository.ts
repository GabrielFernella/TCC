import { getRepository, Repository } from 'typeorm';

import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';

import {
  ICreatePagamentoDTO,
  IUpdatePagamentoDTO,
} from '@modules/aluno/dtos/IPagamentoDTO';
import Pagamento, { StatusPagamento } from '../entities/Pagamento';

class PagamentoRepository implements IPagamentoRepository {
  private ormRepository: Repository<Pagamento>;

  constructor() {
    this.ormRepository = getRepository(Pagamento);
  }

  public async findById(pagamento_id: string): Promise<Pagamento | undefined> {
    const findId = await this.ormRepository.findOne(pagamento_id);
    return findId;
  }

  public async findByEmailPagador(
    email: string,
  ): Promise<Pagamento[] | undefined> {
    const findemail = await this.ormRepository.find({
      where: { emailPagador: email },
    });

    return findemail;
  }

  public async findProcess(): Promise<Pagamento[] | undefined> {
    const findemail = await this.ormRepository.find({
      where: { statusPagamento: 1 },
    });

    return findemail;
  }

  /* public async consultStatusPayment(
    pagamento_id: string,
  ): Promise<StatusPagamento | undefined> {
    const payment = await this.findById(pagamento_id);

    return payment.statusPagamento;
  } */

  public async create(data: ICreatePagamentoDTO): Promise<Pagamento> {
    const pagamento = this.ormRepository.create(data);

    await this.ormRepository.save(pagamento);

    return pagamento;
  }

  public async updateStatus(
    pagamento_id: string,
    status: StatusPagamento,
  ): Promise<Pagamento | undefined> {
    await this.ormRepository.update(pagamento_id, { statusPagamento: status });

    const pagamento = await this.ormRepository.findOne({
      where: { id: pagamento_id },
    });

    return pagamento;
  }

  public async save(pagamento: Pagamento): Promise<Pagamento> {
    return this.ormRepository.save(pagamento);
  }
}

export default PagamentoRepository;
