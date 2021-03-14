import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTeacherService from '@modules/teachers/services/TeacherServices/CreateTeacherService';

export default class TeachersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, avatar, pix, bio } = request.body;

    const createUser = container.resolve(CreateTeacherService);

    const user = await createUser.execute({
      name,
      cpf,
      email,
      password,
      avatar,
      pix,
      bio,
    });

    return response.json(classToClass(user));
  }
}
