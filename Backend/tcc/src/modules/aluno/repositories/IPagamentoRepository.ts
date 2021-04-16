import Pagamento from '../infra/typeorm/entities/Pagamento';

import {
  ICreatePagamentoDTO,
  IUpdatePagamentoDTO,
} from '../dtos/IPagamentoDTO';

export default interface IPagamentoRepository {
  findById(id: string): Promise<Pagamento | undefined>;
  findByEmailPagador(email: string): Promise<Pagamento | undefined>;
  create(data: ICreatePagamentoDTO): Promise<Pagamento>;
  create(data: IUpdatePagamentoDTO): Promise<Pagamento>;
  save(user: Pagamento): Promise<Pagamento>;
}

/*
aluno_id
status
title
emailPagador
valor
*/
