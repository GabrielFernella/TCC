export interface ICreatePagamentoDTO {
  aluno_id: string;
  status: IStatusPagamento;
  title: string;
  emailPagador: string;
  valor: string;
}

interface IStatusPagamento {
  status: 'processando' | 'efetivado' | 'cancelado';
}

export interface IUpdatePagamentoDTO {
  status: IStatusPagamento;
}

/*
aluno_id
status
title
emailPagador
valor
*/
