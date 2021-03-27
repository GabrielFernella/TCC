import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDisciplinaService from '@modules/professor/services/DisciplinaServices/CreateDisciplinaService';
import FindDisciplinaService from '@modules/professor/services/DisciplinaServices/FindDisciplinaService';
import UpdateDisciplinaService from '@modules/professor/services/DisciplinaServices/UpdateDisciplinaService';
import DeleteDisciplinaService from '@modules/professor/services/DisciplinaServices/DeleteDisciplinaService';
import ListDisciplinaService from '@modules/professor/services/DisciplinaServices/ListDisciplinaService';
import AddAvaliacaoDisciplinaService from '@modules/professor/services/DisciplinaServices/AddAvaliacaoDisciplinaService';

export default class DisciplinaController {
  // Listagem Disciplina
  public async listAllDisciplina(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const disciplinaList = container.resolve(ListDisciplinaService);

    const result = await disciplinaList.execute();

    return response.status(200).json(result);
  }

  public async findDisciplina(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { disciplina_id } = request.body;

    const disciplina = container.resolve(FindDisciplinaService);

    const result = await disciplina.execute(disciplina_id);

    return response.status(200).json(result);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const professor_id = request.user.id;
    const { titulo, tag, descricao, valor } = request.body;

    const createDisciplinaService = container.resolve(CreateDisciplinaService);

    const result = await createDisciplinaService.execute({
      professor_id,
      titulo,
      tag,
      descricao,
      valor,
    });

    return response.status(201).json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // Arrumar as rotas
    const { disciplina_id, titulo, tag, descricao, valor } = request.body;
    const professor_id = request.user.id;

    const disciplina = container.resolve(UpdateDisciplinaService);

    const result = await disciplina.execute(professor_id, {
      disciplina_id,
      titulo,
      tag,
      descricao,
      valor,
    });

    return response.status(201).json(result);
  }

  public async addAvaliacao(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { disciplina_id, qtdAvaliacao, mediaAvaliacao } = request.body;

    const disciplinaList = container.resolve(AddAvaliacaoDisciplinaService);

    const result = disciplinaList.execute({
      disciplina_id,
      qtdAvaliacao,
      mediaAvaliacao,
    });

    return response.status(204).json(result);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const professor_id = request.user.id;
    const { disciplina_id } = request.body;

    const disciplina = container.resolve(DeleteDisciplinaService);

    const result = disciplina.execute(professor_id, disciplina_id);

    return response.status(200).json(result);
  }
}

/*
professor_id
titulo
tag
descricao
valor
qtdAvaliacao
mediaAvaliacao
*/
