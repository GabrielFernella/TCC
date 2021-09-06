import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';

import Agendamento from '../infra/typeorm/entities/Agendamento';

@injectable()
class UpdateLinkService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,
  ) {}

  public async execute(
    user_id: string,
    agendamento_id: string,
    link: string,
  ): Promise<Agendamento> {
    // Busca o agendamento
    const agendamento = await this.agendamentoRepository.findById(
      agendamento_id,
    );
    if (!agendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    const professor = await this.professorRepository.findById(user_id);
    if (!professor) {
      throw new AppError('Professor não encontrado na nossa base de dados.');
    }

    // validar se esse professor pertence a esse agendamento.
    if (professor.id !== agendamento.professor_id) {
      throw new AppError('Professor não pertence a esse agendamento');
    }

    agendamento.link = link;

    const updateLink = await this.agendamentoRepository.save(agendamento);

    return updateLink;
  }
}

export default UpdateLinkService;
