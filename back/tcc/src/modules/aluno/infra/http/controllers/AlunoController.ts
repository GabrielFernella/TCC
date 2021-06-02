import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAlunoService from '@modules/aluno/services/CreateAlunoService';
import UpdateAlunoService from '@modules/aluno/services/UpdateAlunoService';
import ShowAlunoService from '@modules/aluno/services/ShowAlunoService';

export default class AlunoController {
  public async show(request: Request, response: Response): Promise<Response> {
    const aluno_id = request.user.id;

    const showUser = container.resolve(ShowAlunoService);

    const user = await showUser.execute(aluno_id);

    return response.json(classToClass(user));
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    // Buscando o id do middleware, evita que p usuário acesse sem permissão
    const { id } = request.user;
    const { avatar, pix } = request.body;

    const updateUser = container.resolve(UpdateAlunoService);

    const updated = await updateUser.execute(id, {
      avatar,
      pix,
    });

    return response.status(201).json(classToClass(updated));
  }
}
