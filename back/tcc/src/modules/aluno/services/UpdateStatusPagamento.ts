import Pagamento from '../infra/typeorm/entities/Pagamento';

import {
  ICreatePagamentoDTO,
  IUpdatePagamentoDTO,
} from '../dtos/IPagamentoDTO';

export default interface IPagamentoRepository {
  // Procurar uma pagamento no banco
  findByID(id: string): Promise<Pagamento | undefined>;

  // Salvando Pagamento
  save(data: Pagamento): Promise<Pagamento>;

  // Criando uma disciplina no banco
  create(data: ICreatePagamentoDTO): Promise<Pagamento>;

  // update uma disciplina no banco
  create(data: IUpdatePagamentoDTO): Promise<Pagamento>;
}
