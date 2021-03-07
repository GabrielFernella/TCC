import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDisponibilidadeService from '@modules/teachers/services/CreateDisponibilidadeService';

export default class DisponibilidadeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { teacher_id, diaSemana, horario } = request.body;

    const createDisponibilidadeService = container.resolve(
      CreateDisponibilidadeService,
    );

    await createDisponibilidadeService.execute({
      teacher_id,
      diaSemana,
      horario,
    });

    return response.status(204).json();
  }
}
