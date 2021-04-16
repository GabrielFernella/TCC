import { getRepository, Repository } from 'typeorm';

import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';

import { ICreatePagamentoDTO } from '@modules/aluno/dtos/IPagamentoDTO';
import Pagamento from '../entities/Pagamento';

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
  ): Promise<Pagamento | undefined> {
    const findemail = await this.ormRepository.findOne({
      where: { emailPagador: email },
    });

    return findemail;
  }

  public async consultStatusPayment(pagamento_id: string): Promise<string> {
    const payment = await this.findById(pagamento_id);

    if (!payment) {
      return '';
    }

    return payment.statusPagamento;
  }

  public async create(data: ICreatePagamentoDTO): Promise<Pagamento> {
    const pagamento = this.ormRepository.create(data);

    await this.ormRepository.save(pagamento);

    return pagamento;
  }

  public async save(pagamento: Pagamento): Promise<Pagamento> {
    return this.ormRepository.save(pagamento);
  }
}

export default PagamentoRepository;
