import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAulaService from '@modules/teachers/services/AulaServices/CreateAulaService';
import FindAulaService from '@modules/teachers/services/AulaServices/FindAulaService';

export default class AulaController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const aula = container.resolve(FindAulaService);

    const result = aula.execute(id);

    return response.status(204).json(result);
    // Parei Aqui
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
}
