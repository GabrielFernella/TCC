import { inject, injectable } from 'tsyringe';

import { isEqual, parseISO, format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import Disciplina from '@modules/professor/infra/typeorm/entities/Disciplina';
import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';

import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IProfessorRepository from '../../repositories/IProfessorRepository';
import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';

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

// Esse serviço consiste em retornar todos os agendamentos vinculados ao professor filtrando pela data

@injectable()
class ListAllAgendamentosService {
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
    const userAppointment = await this.agendamentoRepository.findByProfessorID(
      id,
    );

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

export default ListAllAgendamentosService;

/*
 // GetOthers informations

    /* async function getDados(
      agendamentoRepository: AgendamentoRepository,
      alunoRepository: AlunoRepository,
      professorRepository: ProfessorRepository,
      disciplinaRepository: DisciplinaRepository,
      agendas: Agendamento,
    ): IResponse {
     

      return {
        agendamento,
        professor,
        disciplina,
        aluno,
      };
    } */

/* const values = result.map(async item => {
      /* await getDados(
        this.agendamentoRepository,
        this.alunoRepository,
        this.professorRepository,
        this.disciplinaRepository,
        item,
      ); */
/* const agenda = await this.agendamentoRepository.findById(item.id);
      if (!agenda) {
        throw new AppError('Você não possui nenhum agendamento.');
      }

      const aluno = await this.alunoRepository.findById(item.aluno_id);
      if (!aluno) {
        throw new AppError('Você não possui nenhum agendamento.');
      }

      const disciplina = await this.disciplinaRepository.findByID(
        item.disciplina_id,
      );
      if (!disciplina) {
        throw new AppError('Você não possui nenhum agendamento.');
      }

      const professor = await this.professorRepository.findById(
        item.professor_id,
      );
      if (!professor) {
        throw new AppError('Você não possui nenhum agendamento.');
      }

      const agendamento = await this.agendamentoRepository.findById(item.id);
      if (!agendamento) {
        throw new AppError('Você não possui nenhum agendamento.');
      }

      return Promise.resolve({
        agendamento,
        professor,
        aluno,
        disciplina,
      }); 

*/
