import Disciplina from '../infra/typeorm/entities/Disciplina';

// import ICreateDisciplinaDTO from '../dtos/ICreateDisciplinaDTO';
import {
  IAddAvaliacaoDTO,
  ICreateDisciplinaDTO,
  IUpdateDisciplinaDTO,
} from '../dtos/IDisciplinaDTO';

export default interface IAulaRepository {
  // Listagem de Disciplina
  listDisciplina(): Promise<Disciplina[]>;

  // Procurar uma disciplina no banco
  findByID(id: string): Promise<Disciplina | undefined>;

  // Criando uma disciplina no banco
  create(data: ICreateDisciplinaDTO): Promise<Disciplina>;

  // Procurando Disciplina pelo professor através do ID
  findByTeacherID(id: string): Promise<Disciplina[] | undefined>;

  // Salvando Disciplina
  save(data: Disciplina): Promise<Disciplina>;

  // Update Dsiciplina, como sómente o próprio professor poderá editar, ele terá que colocar o id da disciplina
  updated(
    disciplina_id: string,
    data: IUpdateDisciplinaDTO,
  ): Promise<Disciplina | undefined>;

  addAvaliacao(data: IAddAvaliacaoDTO): Promise<Disciplina | undefined>;

  // O Professor terá que retornar o ID que deseja deletar
  deleted(disciplina_id: string): Promise<string>;
}
