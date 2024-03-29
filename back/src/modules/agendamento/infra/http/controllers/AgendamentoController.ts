import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListHorasDisponiveisProfService from '@modules/agendamento/services/ListHorasDisponiveisProfService';
import FindAgendamentoService from '@modules/agendamento/services/FindAgendamentoService';
import UpdateStatusService from '@modules/agendamento/services/UpdateStatusService';
import CreateAgendamentoService from '@modules/agendamento/services/CreateAgendamentoService';
import ListAgendamentosByIDDate from '@modules/agendamento/services/ListAgendamentosByIDDate';
import GetAgendamentoInfoService from '@modules/agendamento/services/GetAgendamentoInfoService';
import UpdateLinkService from '@modules/agendamento/services/UpdateLinkService';
import ConcludeAgendamentoService from '@modules/agendamento/services/ConcludeAgendamentoService';
import CancelarAgendamento from '@modules/agendamento/services/CancelarAgendamento';
import ReembolsoAgendamento from '@modules/agendamento/services/ReembolsoAgendamento';

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

  // Atualizar o status do agendamento
  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { agendamento_id, status } = request.body;
    const user_id = request.user.id;

    const listAgendamentos = container.resolve(UpdateStatusService);
    const agendamentos = await listAgendamentos.execute(
      agendamento_id,
      status,
      user_id,
    );

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

  public async info(request: Request, response: Response): Promise<Response> {
    const { agendamento_id } = request.params;
    const user_id = request.user.id;

    const getInfoAgendamento = container.resolve(GetAgendamentoInfoService);
    const agendamento = await getInfoAgendamento.execute({
      agendamento_id,
      user_id,
    });

    return response.json(agendamento);
  }

  public async updateLink(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { agendamento_id, link } = request.body;

    const alterLink = container.resolve(UpdateLinkService);
    const agendamento = await alterLink.execute(user_id, agendamento_id, link);

    return response.json(classToClass(agendamento));
  }

  public async conclude(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { id_agendamento, nota, opiniao } = request.body;

    const conclude = container.resolve(ConcludeAgendamentoService);
    const agendamento = await conclude.execute({
      user_id,
      id_agendamento,
      nota,
      opiniao,
    });

    return response.json(classToClass(agendamento));
  }

  public async cancelAgendamento(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { agendamento_id } = request.params;

    const cancel = container.resolve(CancelarAgendamento);
    await cancel.execute(agendamento_id, user_id);

    return response.status(204).json();
  }

  public async reembolsoAgendamento(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { agendamento_id } = request.params;

    const reembolso = container.resolve(ReembolsoAgendamento);
    await reembolso.execute(agendamento_id, user_id);

    return response.status(204).json();
  }
}
