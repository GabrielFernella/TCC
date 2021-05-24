import { StatusAula } from "../infra/typeorm/entities/Agendamento";

interface IStatusAgendamento {
  status: 'processando' | 'confirmacao' | 'efetivado' | 'cancelado';
}

interface IDate {
  day: Date;
  hourStart: number;
}

export interface ICreateAgendamentoDTO {
  data: Date;
  entrada: number;
  saida: number;
  status: StatusAula;
  link: string;
  nota: string;
  opiniao: string;
  disciplina_id: string;
  professor_id: string;
  aluno_id: string;
}

export interface ICreateAgendamentoDTO2 {
  data: Date;
  entrada: number;
  saida: number;
  status: StatusAula;
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
