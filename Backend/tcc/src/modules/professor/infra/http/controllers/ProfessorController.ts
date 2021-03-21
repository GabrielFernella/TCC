import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProfessorService from '@modules/professor/services/ProfessorServices/CreateProfessorService';

export default class TeachersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, avatar, pix, bio } = request.body;

    const createUser = container.resolve(CreateProfessorService);

    const user = await createUser.execute({
      name,
      cpf,
      email,
      password,
      avatar,
      pix,
      bio,
    });

    return response.status(201).json(classToClass(user));
  }
}
