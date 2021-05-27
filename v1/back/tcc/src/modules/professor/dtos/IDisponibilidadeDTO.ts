export interface ICreateDisponibilidadeDTO {
  professor_id: string;
  diaSemana: number;
  horarioEntrada: number;
  horarioSaida: number;
}

export interface IUpdateDisponibilidadeDTO {
  disponibilidade_id: string;
  horarioEntrada: number;
  horarioSaida: number;
}
