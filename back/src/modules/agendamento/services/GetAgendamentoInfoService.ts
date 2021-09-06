import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import Disciplina from '@modules/professor/infra/typeorm/entities/Disciplina';
import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';
import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';
import Pagamento from '@modules/aluno/infra/typeorm/entities/Pagamento';

interface IRequest {
  agendamento_id: string;
  user_id: string;
}

interface IResponse {
  agendamento: Agendamento;
  pagamento: Pagamento;
  disciplina: Disciplina;
  professor: Professor;
  aluno: Aluno;
}

// Esse serviço consiste em retornar todas as informações referente ao agendamento

@injectable()
class GetAgendamentoInfoService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute({
    user_id,
    agendamento_id,
  }: IRequest): Promise<IResponse> {
    // Validar se existe esse agendamento
    const agendamento = await this.agendamentoRepository.findById(
      agendamento_id,
    );
    if (!agendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    // Validar se o usuário tem acesso a esse agendamento
    const userProfessor = await this.professorRepository.findById(user_id);

    const userAluno = await this.alunoRepository.findById(user_id);

    if (!userProfessor && !userAluno) {
      throw new AppError('O usuário não pertence a este agendamento.');
    }

    // Buscar todos as informações referente ao agendamento

    const pagamento = await this.pagamentoRepository.findById(
      agendamento.pagamento_id,
    );
    if (!pagamento) {
      throw new AppError('Não foi possível achar o item para listagem.');
    }

    const aluno = await this.alunoRepository.findById(agendamento.aluno_id);
    if (!aluno) {
      throw new AppError('Não foi possível achar o item para listagem.');
    }

    const disciplina = await this.disciplinaRepository.findByIwithDeleted(
      agendamento.disciplina_id,
    );
    if (!disciplina) {
      throw new AppError('Não foi possível achar o item para listagem.');
    }

    const professor = await this.professorRepository.findById(
      agendamento.professor_id,
    );
    if (!professor) {
      throw new AppError('Não foi possível achar o item para listagem.');
    }

    const result = {
      agendamento,
      pagamento,
      professor,
      disciplina,
      aluno,
    };

    // Promise.resolve(values);

    // console.log(await values);

    return result;
  }
}

export default GetAgendamentoInfoService;
