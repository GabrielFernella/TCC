export interface ICreateDisciplinaDTO {
  professor_id: string;
  titulo: string;
  tag: string[];
  descricao: string;
  valor: number;
  qtdAvaliacao: number;
  mediaAvaliacao: number;
}

export interface IUpdateDisciplinaDTO {
  titulo: string;
  tag: string[];
  descricao: string;
  valor: number;
}

export interface IAddAvaliacaoDTO {
  disciplina_id: string;
  qtdAvaliacao: number;
  mediaAvaliacao: number;
}

/*
  professor_id: string;
  titulo: string;
  tag: string[];
  descricao: string;
  valor: string;
  qtdAvaliacao: string;
  mediaAvaliacao: string;
*/
