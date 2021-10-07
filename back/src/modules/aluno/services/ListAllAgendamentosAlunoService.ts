import { inject, injectable } from 'tsyringe';

import { isEqual, parseISO, format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import Disciplina from '@modules/professor/infra/typeorm/entities/Disciplina';
import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';

interface IRequest {
  id: string;
  date: string;
}

interface IResponse {
  appointment: {
    agendamento: Agendamento;
    disciplina: Disciplina;
    professor: Professor;
    aluno: Aluno;
  };
}

// Esse serviço consiste em retornar todos os agendamentos vinculados ao Aluno filtrando pela data

@injectable()
class ListAllAgendamentosAlunoService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute({ id, date }: IRequest): Promise<IResponse[]> {
    // Primeiro verifica se esse id possui algum agendamento
    const userAppointment = await this.agendamentoRepository.findByAlunoID(id);

    if (!userAppointment) {
      throw new AppError('Você não possui nenhum agendamento.');
    }

    const dataSelect = parseISO(date);

    // Filtrando por data
    const agendamentos = userAppointment.filter(item => {
      const newDate = new Date(item.data);
      return isEqual(newDate.getDate(), dataSelect.getDate());
    });

    // Precisa passar a data

    const result = agendamentos.sort(
      (a, b) => a.data.getTime() - b.data.getTime() && a.entrada - b.entrada,
    );

    const values = Promise.all(
      result.map(async item => {
        const aluno = await this.alunoRepository.findById(item.aluno_id);
        if (!aluno) {
          throw new AppError('Não foi possível achar o item para listagem.');
        }

        const disciplina = await this.disciplinaRepository.findByIwithDeleted(
          item.disciplina_id,
        );
        if (!disciplina) {
          throw new AppError('Não foi possível achar o item para listagem.');
        }

        const professor = await this.professorRepository.findById(
          item.professor_id,
        );
        if (!professor) {
          throw new AppError('Não foi possível achar o item para listagem.');
        }

        const agendamento = await this.agendamentoRepository.findById(item.id);
        if (!agendamento) {
          throw new AppError('Não foi possível achar o item para listagem.');
        }

        return {
          appointment: {
            agendamento,
            professor,
            aluno,
            disciplina,
          },
        };
      }),
    );

    return values;
  }
}

export default ListAllAgendamentosAlunoService;
