import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAvaliacaoService from '@modules/teachers/services/AvaliacaoServices/CreateAvaliacaoService';
import FindAvaliacaoService from '@modules/teachers/services/AvaliacaoServices/FindAvaliacaoService';
import UpdateAvaliacaoService from '@modules/teachers/services/AvaliacaoServices/UpdateAvaliacaoService';
import DeleteAvaliacaoService from '@modules/teachers/services/AvaliacaoServices/DeleteAvaliacaoService';

export default class AvaliacaoController {
  public async show(request: Request, response: Response): Promise<Response> {
    // Busca valores na URL da conexão
    const { id } = request.params;
    const findAvaliabeService = container.resolve(FindAvaliacaoService);
    const show = await findAvaliabeService.execute(id);

    return response.status(200).json(show);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { teacher_id, qtdaulas, qtdavaliacao, opinion } = request.body;

    const createAvaliacaoService = container.resolve(CreateAvaliacaoService);

    const created = await createAvaliacaoService.execute({
      teacher_id,
      qtdaulas,
      qtdavaliacao,
      opinion,
    });

    return response.status(204).json(created);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { teacher_id, qtdaulas, qtdavaliacao, opinion } = request.body;
    const updateAvaliabeService = container.resolve(UpdateAvaliacaoService);

    const updated = await updateAvaliabeService.execute({
      teacher_id,
      qtdaulas,
      qtdavaliacao,
      opinion,
    });
    // console.log(request.body);

    if (!updated) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).json(updated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteAvaliabeService = container.resolve(DeleteAvaliacaoService);

    const result = await deleteAvaliabeService.execute(id);

    return response.status(200).json(result);
  }
}
