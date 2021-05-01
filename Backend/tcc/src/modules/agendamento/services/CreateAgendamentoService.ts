import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// Imports
import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';
import IDisponibilidadeRepository from '@modules/professor/repositories/IDisponibilidadeRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';

import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento, { StatusAula } from '../infra/typeorm/entities/Agendamento';

// DTOs
import { ICreateAgendamentoDTO } from '../dtos/IAgendamentoDTO';
import Professor from '@modules/professor/infra/typeorm/entities/Professor';
import Aluno from '@modules/aluno/infra/typeorm/entities/Aluno';

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

  public async execute(dto: ICreateAgendamentoDTO): Promise<Agendamento> {

    let dateAtual = new Date();

    //Validar se a data ainda vai ocorrer
    if(dateAtual > dto.date.day)
    {
      throw new AppError('Data atual maior que data do agendamento!');
    }

    //Validar se a hora de entrada é maior do que a de saída
    if(dto.date.hourEnd > dto.date.hourStart)
    {
      throw new AppError('Hora de Saída maior que hora de entrada!');
    }

    //VALIDACOES DISCIPLINA
    if(!dto.disciplina_id)
    {
      throw new AppError('Disciplina Inválida!');
    }

    this.disciplinaRepository.findByID(dto.disciplina_id).then(disciplina =>{
      if(disciplina){
        throw new AppError('Não foi possível obter o aluno!');
      }
    })

    //VALIDACOES ALUNO
    if(!dto.aluno_id)
    {
      throw new AppError('Aluno Inválido!');
    }

    this.alunoRepository.findById(dto.aluno_id).then(aluno =>{
      
      if(!aluno){
        throw new AppError('Não foi possível obter o aluno!');
      }
      
      //Validar se aluno pode agendar Aula

      //Validar se Aluno está bloqueado no sistema
      if(aluno.bloqueio)
      {
        throw new AppError('Aluno está bloqueado pelo sistema!');
      }

      //Validar se Aluno contém uma aula no mesmo horário
      if(aluno.agendamentos.filter(a => a.data == dto.date.day && ( a.entrada == dto.date.hourStart || a.saida == dto.date.hourEnd )))
      {
        throw new AppError('Aluno já tem um agendamento neste horário!');
      }
    });

    //VALIDACOES PROFESSOR

    if(!dto.professor_id)
    {
      throw new AppError('Professor Inválido!');
    }

    this.professorRepository.findById(dto.professor_id).then(professor =>{

      if(!professor){
        throw new AppError('Não foi possível obter o professor!');
      }

      //Validar se Professor contém uma aula no mesmo horário
      if(professor.agendamentos.filter(a => a.data == dto.date.day && ( a.entrada == dto.date.hourStart || a.saida == dto.date.hourEnd )))
      {
        throw new AppError('Professor já tem um agendamento neste horário!');
      }

    })

    const result = await this.agendamentoRepository.create(dto);

    if (!result) {
      throw new AppError('Não foi possível criar o agendamento');
    }

    return result;
  }
}

export default CreateAgendamentoService;
