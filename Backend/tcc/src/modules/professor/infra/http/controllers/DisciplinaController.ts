import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDisciplinaService from '@modules/professor/services/DisciplinaServices/CreateDisciplinaService';
import FindDisciplinaService from '@modules/professor/services/DisciplinaServices/FindDisciplinaService';
import UpdateDisciplinaService from '@modules/professor/services/DisciplinaServices/UpdateDisciplinaService';
import DeleteDisciplinaService from '@modules/professor/services/DisciplinaServices/DeleteDisciplinaService';

export default class DisciplinaController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const disciplina = container.resolve(FindDisciplinaService);

    const result = disciplina.execute(id);

    return response.status(204).json(result);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { professor_id, titulo, tag, descricao, valor } = request.body;

    const createDisciplinaService = container.resolve(CreateDisciplinaService);

    await createDisciplinaService.execute({
      professor_id,
      titulo,
      tag,
      descricao,
      valor,
    });

    return response.status(204).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { professor_id, titulo, tag, description, value } = request.body;
    const { id } = request.user;

    const disciplina = container.resolve(UpdateDisciplinaService);

    const result = disciplina.execute(id, {
      professor_id,
      titulo,
      tag,
      description,
      value,
    });

    return response.status(200).json(result);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const disciplina = container.resolve(DeleteDisciplinaService);

    const result = disciplina.execute(id);

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
