/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/aluno/providers/HashProvider/models/IHashProvider';

import Aluno from '../infra/typeorm/entities/Aluno';
import IAlunoRepository from '../repositories/IAlunoRepository';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  avatar: string;
  pix: string;
}

@injectable()
class CreateAlunoService {
  constructor(
    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

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
  }: IRequest): Promise<Aluno> {
    // Procurando se há um user com o mesmo CPF
    /* const checkUserCpfExists = await this.alunoRepository.find(cpf);
    if (checkUserCpfExists) {
      throw new AppError('CPF address already used');
    } */

    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.alunoRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    // eslint-disable-next-line no-use-before-define
    if (!validarCPF(cpf)) {
      throw new AppError('CPF inválido');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.alunoRepository.create({
      name,
      cpf,
      email,
      password: hashPassword,
      avatar,
      pix,
      bloqueio: false,
    });

    return user;
  }
}

export default CreateAlunoService;

function validarCPF(cpf: string) {
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
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
}
