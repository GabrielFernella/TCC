import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAvaliacaoService from '@modules/teachers/services/CreateAvaliacaoService';

export default class AvaliacaoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { teacher_id, qtdAulas, qtdAvaliacao, opinion } = request.body;

    const createAvaliacaoService = container.resolve(CreateAvaliacaoService);

    await createAvaliacaoService.execute({
      teacher_id,
      qtdAulas,
      qtdAvaliacao,
      opinion,
    });

    return response.status(204).json();
  }
}
