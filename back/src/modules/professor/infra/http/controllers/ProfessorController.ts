import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowProfessorService from '@modules/professor/services/ProfessorServices/ShowProfessorService';
import CreateProfessorService from '@modules/professor/services/ProfessorServices/CreateProfessorService';
import UpdateProfessorService from '@modules/professor/services/ProfessorServices/UpdateProfessorService';
import ListAllAgendamentosProfessorService from '@modules/professor/services/ProfessorServices/ListAllAgendamentosProfessorService';
import ListAgendamentosByDateService from '@modules/professor/services/ProfessorServices/ListAgendamentosByDateService';

export default class TeachersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { professor_id } = request.params;

    const showUser = container.resolve(ShowProfessorService);

    const user = await showUser.execute(professor_id);

    return response.status(200).json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, avatar, pix, biografia } = request.body;

    const createUser = container.resolve(CreateProfessorService);

    const user = await createUser.execute({
      name,
      cpf,
      email,
      password,
      avatar,
      pix,
      biografia,
    });

    return response.status(201).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    // Buscando o id do middleware, evita que p usuário acesse sem permissão
    const { id } = request.user;
    const { name, avatar, pix, biografia } = request.body;

    const updateUser = container.resolve(UpdateProfessorService);

    const updated = await updateUser.execute(id, {
      name,
      avatar,
      pix,
      biografia,
    });

    return response.status(201).json(classToClass(updated));
  }

  public async listAllAppointments(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;

    const appointments = container.resolve(ListAllAgendamentosProfessorService);

    const agendamentos = await appointments.execute({ id });

    return response.status(200).json(classToClass(agendamentos));
  }

  public async listAppointmentsByDate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { date } = request.body;

    const appointments = container.resolve(ListAgendamentosByDateService);

    const agendamentos = await appointments.execute({ id, date });

    return response.status(200).json(classToClass(agendamentos));
  }
}
