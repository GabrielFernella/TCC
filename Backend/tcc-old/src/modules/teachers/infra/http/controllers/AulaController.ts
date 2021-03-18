import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAulaService from '@modules/teachers/services/AulaServices/CreateAulaService';
import FindAulaService from '@modules/teachers/services/AulaServices/FindAulaService';
import UpdateAulaService from '@modules/teachers/services/AulaServices/UpdateAulaService';
import DeleteAulaService from '@modules/teachers/services/AulaServices/DeleteAulaService';

export default class AulaController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const aula = container.resolve(FindAulaService);

    const result = aula.execute(id);

    return response.status(204).json(result);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { teacher_id, tittle, tag, description, value } = request.body;

    const createAulaService = container.resolve(CreateAulaService);

    await createAulaService.execute({
      teacher_id,
      tittle,
      tag,
      description,
      value,
    });

    return response.status(204).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { teacher_id, tittle, tag, description, value } = request.body;
    const { id } = request.user;

    const aula = container.resolve(UpdateAulaService);

    const result = aula.execute(id, {
      teacher_id,
      tittle,
      tag,
      description,
      value,
    });

    return response.status(200).json(result);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const aula = container.resolve(DeleteAulaService);

    const result = aula.execute(id);

    return response.status(200).json(result);
  }
}
