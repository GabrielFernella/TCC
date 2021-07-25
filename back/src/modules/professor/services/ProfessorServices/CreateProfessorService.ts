import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/professor/providers/HashProvider/models/IHashProvider';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import Professor from '../../infra/typeorm/entities/Professor';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  avatar: string;
  pix: string;
  biografia: string;
}

@injectable()
class CreateProfessorService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    cpf,
    email,
    password,
    avatar,
    pix,
    biografia,
  }: IRequest): Promise<Professor> {
    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.professorRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    if (validarCPF(cpf) === false) {
      throw new AppError('CPF inválido');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.professorRepository.create({
      name,
      cpf,
      email,
      password: hashPassword,
      avatar,
      pix,
      biografia,
    });

    return user;
  }
}

export default CreateProfessorService;

function validarCPF(cpf: string) {
  // eslint-disable-next-line no-param-reassign
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  )
    return false;
  // Valida 1o digito
  let add = 0;
  // eslint-disable-next-line radix
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  // eslint-disable-next-line radix
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  // eslint-disable-next-line radix
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  // eslint-disable-next-line radix
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
}

/*
function valida_cpf(cpf: string) {
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (cpf.length < 11)
    return false;
  for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--)
      soma += numeros.charAt(10 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return false;
    numeros = cpf.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--)
      soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return false;
    return true;
  }
  else
    return false;
} */
