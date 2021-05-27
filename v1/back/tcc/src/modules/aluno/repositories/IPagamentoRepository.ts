import Pagamento, {
  StatusPagamento,
} from '../infra/typeorm/entities/Pagamento';

import {
  ICreatePagamentoDTO,
  IUpdatePagamentoDTO,
} from '../dtos/IPagamentoDTO';

export default interface IPagamentoRepository {
  findById(id: string): Promise<Pagamento | undefined>;
  findByEmailPagador(email: string): Promise<Pagamento | undefined>;
  // consultStatusPayment(id: string): Promise<StatusPagamento | undefined>;
  create(data: ICreatePagamentoDTO): Promise<Pagamento>;
  updateStatus(
    pagamento_id: string,
    data: StatusPagamento,
  ): Promise<Pagamento | undefined>;
  save(user: Pagamento): Promise<Pagamento>;
}

/*
aluno_id
status
title
emailPagador
valor
*/
