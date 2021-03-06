import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITeacherRepository from '../repositories/ITeacherRepository';

import IAvaliacaoRepository from '../repositories/IAvaliacaoRepository';
import Avaliacao from '../infra/typeorm/entities/Avaliacao';

interface IRequest {
  teacher_id: string;
  qtdAulas: number;
  qtdAvaliacao: number;
  opinion: string;
}

@injectable()
class CreateAvaliacaoService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeacherRepository,

    @inject('AvaliacaoProvider')
    private avaliacaoProvider: IAvaliacaoRepository,
  ) {}

  public async execute({
    teacher_id,
    qtdAulas,
    qtdAvaliacao,
    opinion,
  }: IRequest): Promise<Avaliacao> {
    // Procurando se há um user com o mesmo email
    const findTeacher = await this.teachersRepository.findById(teacher_id);
    if (findTeacher) {
      throw new AppError('Teacher not found');
    }

    const cadAvaliacao = await this.avaliacaoProvider.create({
      teacher_id,
      qtdAulas,
      qtdAvaliacao,
      opinion,
    });

    return cadAvaliacao;
  }
}

export default CreateAvaliacaoService;
