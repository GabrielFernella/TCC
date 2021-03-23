export interface ICreateProfessorDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  avatar: string;
  pix: string;
  biografia: string;
}

// Autenticar Professor
export interface IAuthProfessorDTO {
  email: string;
  password: string;
}

export interface IUpdateProfessorDTO {
  name: string;
  avatar: string;
  pix: string;
  biografia: string;
}
