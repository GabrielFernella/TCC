import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAlunoService from '@modules/aluno/services/CreateAlunoService';

export default class AlunoController {
  public async create(request: Request, response: Response): Promise<Response> {
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
  }
}
