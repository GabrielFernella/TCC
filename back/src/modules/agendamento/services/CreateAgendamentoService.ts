import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// Imports
import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';
import IDisponibilidadeRepository from '@modules/professor/repositories/IDisponibilidadeRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';

// DTOs
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';
import { ICreatePagamentoDTO } from '@modules/aluno/dtos/IPagamentoDTO';
import { StatusPagamento } from '@modules/aluno/infra/typeorm/entities/Pagamento';
import { ICreateAgendamentoDTO } from '../dtos/IAgendamentoDTO';
import Agendamento, { StatusAula } from '../infra/typeorm/entities/Agendamento';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';

export interface IAgendamentoDTO {
  data: Date;
  entrada: number;
  disciplina_id: string;
  professor_id: string;
  aluno_id: string;
}

@injectable()
class CreateAgendamentoService {
  constructor(
    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,

    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,

    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  public async execute(dto: IAgendamentoDTO): Promise<Agendamento> {
    const dateAtual = new Date();
    let alunoEmail = '';
    const pixProfessor = '';
    let valorDisciplina = 0;
    let titleDisciplina = '';
    const hourEnd = dto.entrada + 1;

    // Validar se a data ainda vai ocorrer
    if (dateAtual > dto.data) {
      throw new AppError('Data atual maior que data do agendamento!');
    }

    // Validar se a hora de entrada é maior do que a de saída
    if (hourEnd < dto.entrada) {
      throw new AppError('Hora de Saída maior que hora de entrada!');
    }

    // #################### VALIDACOES DISCIPLINA
    if (!dto.disciplina_id) {
      throw new AppError('Disciplina Inválida!');
    }

    await this.disciplinaRepository
      .findByID(dto.disciplina_id)
      .then(disciplina => {
        if (!disciplina) {
          throw new AppError('Não foi possível obter a disciplina!');
        }

        valorDisciplina = disciplina.valor;
        titleDisciplina = disciplina.titulo;
      });

    // ###################### VALIDACOES ALUNO
    /* if (!dto.aluno_id) {
      throw new AppError('Aluno Inválido!');
    } */

    await this.alunoRepository.findById(dto.aluno_id).then(aluno => {
      if (!aluno) {
        throw new AppError('Não foi possível obter o aluno!');
      }

      // Validar se aluno pode agendar Aula

      // Validar se Aluno está bloqueado no sistema
      if (aluno.bloqueio) {
        throw new AppError('Aluno está bloqueado pelo sistema!');
      }

      // Validar se Aluno contém uma aula no mesmo dia e horário(alterado)
      if (aluno.agendamentos) {
        const result = aluno.agendamentos.filter(a => {
          if (
            a.data.getDay() === dto.data.getDay() &&
            (a.entrada === dto.entrada || a.saida === hourEnd)
          ) {
            return a; // ou true
          }
          return false;
        });
        if (result.length >= 1) {
          throw new AppError('Aluno já tem um agendamento neste horário!');
        }
      }

      alunoEmail = aluno.email;
    });

    // VALIDACOES PROFESSOR

    if (!dto.professor_id) {
      throw new AppError('Professor Inválido!');
    }

    const professorAgendamentos = await this.agendamentoRepository.findByProfessorID(
      dto.professor_id,
    );

    if (professorAgendamentos) {
      const disponibilidadeTeacher = await this.disponibilidadeRepository.findByProfessorID(
        dto.professor_id,
      );

      if (!disponibilidadeTeacher) {
        throw new AppError('Professor não possui disponibilidade!');
      }

      const verifyDisponibilidade = disponibilidadeTeacher.filter(
        item =>
          item.diaSemana === dto.data.getDay() &&
          item.horarioEntrada >= dto.entrada &&
          item.horarioSaida <= dto.entrada + 1,
      );

      if (verifyDisponibilidade.length >= 1) {
        throw new AppError(
          'Intervalo de horas inválidas de acordo com o professor',
        );
      }

      const verifyDisponibilidadeDoProfessor = professorAgendamentos.filter(
        item =>
          item.data.getDay() === dto.data.getDay() &&
          (item.entrada === dto.entrada || item.saida === hourEnd),
      );

      if (verifyDisponibilidadeDoProfessor.length >= 1) {
        throw new AppError(
          'Professor já possui um agendamento para essa data!',
        );
      }
    }

    /* await this.professorRepository
      .findById(dto.professor_id)
      .then(async professor => {
        if (!professor) {
          throw new AppError('Não foi possível obter o professor!');
        }

        const verifyDisponibilidadeDoProfessor = await this.agendamentoRepository.findByProfessorID(
          professor.id,
        );

        if (verifyDisponibilidadeDoProfessor === undefined) {
          return;
        }

        const dataPermitida = professor.agendamentos.filter(a => {
          if (
            a.data.getDay() === dto.data.getDay() &&
            (a.entrada === dto.entrada || a.saida === hourEnd)
          ) {
            return true;
          }
          return false;
        });

        if (dataPermitida.length >= 1) {
          throw new AppError('Professor já tem um agendamento neste horário!');
        }
      }); */

    // Criar Pagamento

    const pagamento = await this.pagamentoRepository.create({
      aluno_id: dto.aluno_id,
      status: StatusPagamento.EmEspera,
      emailPagador: alunoEmail,
      pixDestinatario: pixProfessor,
      title: titleDisciplina,
      valor: valorDisciplina,
    });

    const result = await this.agendamentoRepository.create({
      ...dto,
      saida: dto.entrada + 1,
      link: '',
      opiniao: '',
      status: 0,
      nota: '',
      pagamento_id: pagamento.id,
    });

    if (!result) {
      throw new AppError('Não foi possível criar o agendamento');
    }

    return result;
  }
}

export default CreateAgendamentoService;
