export interface ICreateAlunoDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  avatar: string;
  pix: string;
  bloqueio: string;
}

export interface IAuthAluno {
  email: string;
  password: string;
}
