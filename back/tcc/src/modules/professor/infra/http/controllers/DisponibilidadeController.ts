import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDisponibilidadeService from '@modules/professor/services/DisponibilidadeServices/CreateDisponibilidadeService';
import ShowDisponibilidadeService from '@modules/professor/services/DisponibilidadeServices/ShowDisponibilidadeService';
import DeleteDisponibilidadeService from '@modules/professor/services/DisponibilidadeServices/DeleteDisponibilidadeService';

/* interface IHeader {
  disponibilidade_id: string;
} */
export default class DisponibilidadeController {
  public async show(request: Request, response: Response): Promise<Response> {
    // passa o ID do professor para exibir todas as aulas que estão relacionadas ao usuário
    const { professor_id } = request.headers;
    // Talvez tenha alteração aqui #########
    const user_id = request.user;
    let id;

    if (professor_id === undefined || professor_id === []) {
      id = user_id.id;
    } else {
      id = professor_id;
    }

    const showDisponibilidadeService = container.resolve(
      ShowDisponibilidadeService,
    );

    const result = await showDisponibilidadeService.execute(id.toString());

    return response.status(200).json(result);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // Buscando do middleware
    const professor_id = request.user.id;
    const { diaSemana, horarioEntrada, horarioSaida } = request.body;

    const createDisponibilidadeService = container.resolve(
      CreateDisponibilidadeService,
    );

    const disp = await createDisponibilidadeService.execute({
      professor_id,
      diaSemana,
      horarioEntrada,
      horarioSaida,
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
