interface IStatusAgendamento {
  status: 'processando' | 'confirmacao' | 'efetivado' | 'cancelado';
}

interface IDate {
  date: string;
  entrada: string;
  saida: string;
}

export interface ICreateAgendamentoDTO {
  date: IDate;
  status: IStatusAgendamento;
  link: string;
  nota: string;
  opiniao: string;
  disciplina: string;
  professor: string;
  aluno: string;
  pagamento: string;
}

export interface IUpdateAgendamentoDTO {
  status: IStatusAgendamento;
}
