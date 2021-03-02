import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateStudentService from '@modules/students/services/CreateStudentService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    const createUser = container.resolve(CreateStudentService);

    const user = await createUser.execute({
      name,
      cpf,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
