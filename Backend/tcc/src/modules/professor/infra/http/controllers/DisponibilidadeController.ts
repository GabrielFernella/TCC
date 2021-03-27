import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDisponibilidadeService from '@modules/professor/services/DisponibilidadeServices/CreateDisponibilidadeService';
import ShowDisponibilidadeService from '@modules/professor/services/DisponibilidadeServices/ShowDisponibilidadeService';
import DeleteDisponibilidadeService from '@modules/professor/services/DisponibilidadeServices/DeleteDisponibilidadeService';

export default class DisponibilidadeController {
  public async show(request: Request, response: Response): Promise<Response> {
    // passa o ID do professor para exibir todas as aulas que estão relacionadas ao usuário
    const { id } = request.body;
    // Talvez tenha alteração aqui #########
    // const { id } = request.user;

    const showDisponibilidadeService = container.resolve(
      ShowDisponibilidadeService,
    );

    const result = await showDisponibilidadeService.execute(id);
    return response.status(200).json(result);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // Buscando do middleware
    const teacher_id = request.user.id;
    const { diaSemana, horarioentrada, horariosaida } = request.body;

    const createDisponibilidadeService = container.resolve(
      CreateDisponibilidadeService,
    );

    const disp = await createDisponibilidadeService.execute({
      teacher_id,
      diaSemana,
      horarioentrada,
      horariosaida,
    });

    return response.status(201).json(disp);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    // Passsa o parametro específico da tabela que deseja excluir
    const professor_id = request.user.id;
    const { disponibilidade_id } = request.params;

    const deleteDisponibilidadeService = container.resolve(
      DeleteDisponibilidadeService,
    );

    const result = await deleteDisponibilidadeService.execute(
      professor_id,
      disponibilidade_id,
    );
    return response.status(202).json(result);
  }
}
