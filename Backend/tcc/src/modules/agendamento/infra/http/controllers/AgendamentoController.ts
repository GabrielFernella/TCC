import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAgendamentoByEmailAluno from '@modules/agendamento/services/ListAgendamentoByEmailAluno';

export default class AgendamentoController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    // const { agendamento_id } = request.body;

    const listAgendamentos = container.resolve();
    const agendamentos = listAgendamentos.execute();

    return response.json(agendamentos);
  }

  public async listByEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const findAluno = container.resolve(ListAgendamentoByEmailAluno);

    const agendamentos = findAluno.execute(email);

    return response.json(agendamentos);
  }

  public async findAgendamento(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { agendamento_id } = request.body;

    const listAgendamentos = container.resolve();
    const agendamentos = listAgendamentos.execute(agendamento_id);

    return response.json(agendamentos);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { status } = request.body;
    const user_id = request.user.id;

    const listAgendamentos = container.resolve();
    const agendamentos = listAgendamentos.execute();

    return response.json(agendamentos);
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { status } = request.body;
    const user_id = request.user.id;

    const listAgendamentos = container.resolve();
    const agendamentos = listAgendamentos.execute();

    return response.json(agendamentos);
  }

  /* public async create(request: Request, response: Response): Promise<Response> {
      const { name, cpf, email, password, avatar, pix } = request.body;

    const createUser = container.resolve(CreateAlunoService);

    const user = await createUser.execute({
      name,
      cpf,
      email,
      password,
      avatar,
      pix,
    });

    return response.json(classToClass(user));
  } */
}
