import { StatusPagamento } from '../infra/typeorm/entities/Pagamento';

export interface ICreatePagamentoDTO {
  aluno_id: string;
  professor_id: string;
  status: StatusPagamento;
  title: string;
  emailPagador: string;
  valor: number;
  pixDestinatario: string;
  key?: string;
}

export interface IUpdatePagamentoDTO {
  status: StatusPagamento;
}

/*
aluno_id
status
title
emailPagador
valor
*/
