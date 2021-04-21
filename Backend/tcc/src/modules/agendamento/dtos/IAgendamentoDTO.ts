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
  status: string;
  link: string;
  nota: string;
  opiniao: string;
  disciplina_id: string;
  professor_id: string;
  aluno_id: string;
  pagamento_id: string;
}

export interface IUpdateAgendamentoDTO {
  status: IStatusAgendamento;
}
