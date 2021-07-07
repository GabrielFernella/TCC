import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IDisponibilidadeRepository from '@modules/professor/repositories/IDisponibilidadeRepository';
import Disponibilidade from '@modules/professor/infra/typeorm/entities/Disponibilidade';
import IDisciplinaRepository from '../../repositories/IDisciplinaRepository';
import Disciplina from '../../infra/typeorm/entities/Disciplina';

interface IResponse {
  disciplina: Disciplina;
  professor: {
    id?: string;
    nome?: string;
    avatar?: string;
    email?: string;
  };
  disponibilidade: Disponibilidade[];
}

@injectable()
class ListDisciplinaService {
  constructor(
    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,

    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('DisponibilidadeRepository')
    private disponibilidadeRepository: IDisponibilidadeRepository,
  ) {}

  public async execute(): Promise<IResponse[]> {
    let values: IResponse;

    // Listando todas as Disciplinas
    const listDisciplina = await this.disciplinaRepository.listDisciplina();

    if (listDisciplina.length === 0) {
      throw new AppError('Disciplinas não encontradas.');
    }

    const teste = listDisciplina.map(async disciplina => {
      // Buscando Professor
      const findTeacher = await this.professorRepository.findById(
        disciplina.professor_id,
      );
      if (!findTeacher) {
        throw new AppError('Professor não encontrado.');
      }

      // Buscando disciplina
      const findDisponibilidade = await this.disponibilidadeRepository.findByProfessorID(
        disciplina.professor_id,
      );
      if (!findDisponibilidade) {
        throw new AppError('Disponibilidade não encontrada.');
      }

      values = {
        disciplina,
        professor: {
          id: findTeacher?.id,
          nome: findTeacher?.name,
          email: findTeacher?.email,
          avatar: findTeacher?.avatar,
        },
        disponibilidade: findDisponibilidade,
      };

      return values;
    });

    const response = await Promise.all(teste);

    const valueFinal = response.filter(t => t.disciplina.ativado === true);

    const result = (async () => {
      const resultado = await Promise.all(valueFinal);
      return resultado;
    })();

    return result;
  }
}

export default ListDisciplinaService;
