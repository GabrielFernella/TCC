import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateAvaliacaoDTO from '@modules/teachers/dtos/ICreateAvaliacaoDTO';
import ITeacherRepository from '../../repositories/ITeacherRepository';

import IAvaliacaoRepository from '../../repositories/IAvaliacaoRepository';
import Avaliacao from '../../infra/typeorm/entities/Avaliacao';

/* interface IRequest {
  teacher_id: string;
  qtdAulas: number;
  qtdAvaliacao: number;
  opinion: string;
} */

@injectable()
class CreateAvaliacaoService {
  constructor(
    @inject('TeacherRepository')
    private teacherRepository: ITeacherRepository,

    @inject('AvaliacaoRepository')
    private avaliacaoRepository: IAvaliacaoRepository,
  ) {}

  public async execute({
    teacher_id,
    qtdaulas,
    qtdavaliacao,
    opinion,
  }: ICreateAvaliacaoDTO): Promise<Avaliacao> {
    // Procurando se há um user com o mesmo email
    const findTeacher = await this.teacherRepository.findById(teacher_id);
    if (!findTeacher) {
      throw new AppError('Teacher not found');
    }

    const cadAvaliacao = await this.avaliacaoRepository.create({
      teacher_id,
      qtdaulas,
      qtdavaliacao,
      opinion,
    });

    return cadAvaliacao;
  }
}

export default CreateAvaliacaoService;
