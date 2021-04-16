import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import IHashProvider from '@modules/aluno/providers/HashProvider/models/IHashProvider';

// Essa classe possui métodos a serem analisados

import Pagamento from '../infra/typeorm/entities/Pagamento';
import IPagamentoRepository from '../repositories/IPagamentoRepository';

import { ICreatePagamentoDTO } from '../dtos/IPagamentoDTO';

@injectable()
class CreateStudentService {
  constructor(
    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,
  ) {}

  public async execute({
    aluno_id,
    status,
    title,
    emailPagador,
    valor,
    pixDestinatario,
  }: ICreatePagamentoDTO): Promise<Pagamento> {
    // Procurando se há um user com o mesmo email
    const checkUserExists = await this.pagamentoRepository.findByEmailPagador(
      emailPagador,
    );
    if (!checkUserExists) {
      throw new AppError('Email User not found');
    }

    const user = await this.pagamentoRepository.create({
      aluno_id,
      status,
      title,
      emailPagador,
      valor,
      pixDestinatario,
    });

    return user;
  }
}

export default CreateStudentService;

/*
aluno_id
status
title
emailPagador
valor
*/
