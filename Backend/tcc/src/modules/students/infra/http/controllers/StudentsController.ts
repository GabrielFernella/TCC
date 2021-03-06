import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateStudentService from '@modules/students/services/CreateStudentService';

export default class StudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, avatar, pix } = request.body;

    const createUser = container.resolve(CreateStudentService);

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
