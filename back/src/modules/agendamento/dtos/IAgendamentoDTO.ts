import { StatusAula } from '../infra/typeorm/entities/Agendamento';

/* export interface IStatusAgendamento {
  status: 'processando' | 'agendado' | 'efetivado' | 'cancelado';
} */

interface IDate {
  day: Date;
  hourStart: number;
}

/* export interface IAgendamentoDTO {
  data: Date;
  entrada: number;
  saida: number;
  //status: StatusAula;
  //link: string;
  //nota: string;
  //opiniao: string;
  disciplina_id: string;
  professor_id: string;
  aluno_id: string;
} */

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
  pagamento_id: string;
}

export interface IUpdateStatusAgendamentoDTO {
  status: StatusAula;
}
