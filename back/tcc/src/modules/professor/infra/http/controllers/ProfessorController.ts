import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProfessorService from '@modules/professor/services/ProfessorServices/CreateProfessorService';
import UpdateProfessorService from '@modules/professor/services/ProfessorServices/UpdateProfessorService';

export default class TeachersController {
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
}
