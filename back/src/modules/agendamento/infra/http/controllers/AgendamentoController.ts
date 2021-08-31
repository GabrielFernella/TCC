import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListHorasDisponiveisProfService from '@modules/agendamento/services/ListHorasDisponiveisProfService';
import FindAgendamentoService from '@modules/agendamento/services/FindAgendamentoService';
import UpdateStatusService from '@modules/agendamento/services/UpdateStatusService';
import CreateAgendamentoService from '@modules/agendamento/services/CreateAgendamentoService';
import ListAgendamentosByIDDate from '@modules/agendamento/services/ListAgendamentosByIDDate';

export default class AgendamentoController {
  /* public async listAllByAluno(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const listAlunos = container.resolve(FindByAlunoIdService);
    const agendamentos = listAlunos.execute(user_id);

    return response.json(agendamentos);
  } */

  public async ListHorasDisponiveisProf(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { professor_id, data } = request.body;

    const listHorasDisponiveis = container.resolve(
      ListHorasDisponiveisProfService,
    );
    const agendamentos = await listHorasDisponiveis.execute(professor_id, data);

    return response.status(200).json(agendamentos);
  }

  /* public async listTodosAgendamentosPorData(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.body;
    const { email } = request.body;

    const findAluno = container.resolve(ListAgendamentosByIDDate);
    const agendamentos = findAluno.execute(email);
    return response.json(agendamentos);
  } */

  public async findAgendamento(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { agendamento_id } = request.body;

    const listAgendamentos = container.resolve(FindAgendamentoService);
    const agendamento = listAgendamentos.execute(agendamento_id);

    return response.json(agendamento);
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, status } = request.body;
    // const id = request.user.id;

    const listAgendamentos = container.resolve(UpdateStatusService);
    const agendamentos = listAgendamentos.execute(id, status);

    return response.json(agendamentos);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      data,
      entrada,
      disciplina_id,
      professor_id,
      aluno_id,
    } = request.body;

    const listAgendamentos = container.resolve(CreateAgendamentoService);
    const agendamento = await listAgendamentos.execute({
      data,
      entrada,
      disciplina_id,
      professor_id,
      aluno_id,
    });

    return response.json(classToClass(agendamento));
  }
}
