import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAulaService from '@modules/teachers/services/CreateAulaService';

export default class AulaController {
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
